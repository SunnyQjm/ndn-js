import {Data} from "../../data";
import {Interest} from "../../interest";
import {WireFormat} from "../../encoding";
import {ValidationRequest} from "./validation-request";
import {Name} from "../../name";
import {Blob, SignedBlob} from "../../util";
import {Signature} from "../../signature";

export class PolicyManager {
    /**
     * A PolicyManager is an abstract base class to represent the policy for
     * verifying data packets. You must create an object of a subclass.
     * @constructor
     */
    constructor();

    /**
     * Check if the received data packet or signed interest can escape from
     * verification and be trusted as valid.
     * Your derived class should override.
     *
     * @param {Data|Interest} dataOrInterest The received data packet or interest.
     * @return {boolean} True if the data or interest does not need to be verified
     * to be trusted as valid, otherwise false.
     */
    skipVerifyAndTrust(dataOrInterest: Data | Interest): boolean;

    /**
     * Check if this PolicyManager has a verification rule for the received data
     * packet or signed interest.
     * Your derived class should override.
     *
     * @param {Data|Interest} dataOrInterest The received data packet or interest.
     * @return {boolean} True if the data or interest must be verified, otherwise
     * false.
     */
    requireVerify(dataOrInterest: Data | Interest): boolean;

    /**
     * Check whether the received data or interest packet complies with the
     * verification policy, and get the indication of the next verification step.
     * Your derived class should override.
     *
     * @param {Data|Interest} dataOrInterest The Data object or interest with the
     * signature to check.
     * @param {number} stepCount The number of verification steps that have been
     * done, used to track the verification progress.
     * @param {function} onVerified If the signature is verified, this calls
     * onVerified(dataOrInterest).
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onValidationFailed If the signature check fails, this calls
     * onValidationFailed(dataOrInterest, reason).
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {WireFormat} wireFormat
     * @return {ValidationRequest} The indication of next verification step, or
     * null if there is no further step.
     */
    checkVerificationPolicy(dataOrInterest: Data | Interest, stepCount: number, onVerified: (dataOrInterest: Data | Interest) => any,
                            onValidationFailed: (dataOrInterest: Data | Interest, reason: any) => any, wireFormat: WireFormat): ValidationRequest;

    /**
     * Check if the signing certificate name and data name satisfy the signing
     * policy.
     * Your derived class should override.
     *
     * @param {Name} dataName The name of data to be signed.
     * @param {Name} certificateName The name of signing certificate.
     * @return {boolean} True if the signing certificate can be used to sign the
     * data, otherwise false.
     */
    checkSigningPolicy(dataName: Name, certificateName: Name): boolean;

    /**
     * Infer the signing identity name according to the policy. If the signing
     * identity cannot be inferred, return an empty name.
     * Your derived class should override.
     *
     * @param {Name} dataName The name of data to be signed.
     * @return {Name} The signing identity or an empty name if cannot infer.
     */
    inferSigningIdentity(dataName: Name): Name;

    /**
     * Check the type of signature and use the publicKeyDer to verify the
     * signedBlob using the appropriate signature algorithm.
     * @param {Signature} signature An object of a subclass of Signature, e.g.
     * Sha256WithRsaSignature.
     * @param {SignedBlob} signedBlob the SignedBlob with the signed portion to
     * verify.
     * @param {Blob} publicKeyDer The DER-encoded public key used to verify the
     * signature.
     * @param {function} onComplete This calls onComplete(true) if the signature
     * verifies, otherwise onComplete(false).
     * @throws SecurityException if the signature type is not recognized or if
     * publicKeyDer can't be decoded.
     */
    verifySignature(signature: Signature, signedBlob: SignedBlob, publicKeyDer: Blob, onComplete: (verifies: boolean) => any);
}