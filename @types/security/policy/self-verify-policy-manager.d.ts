import {PolicyManager} from "./policy-manager";
import {IdentityStorage} from "../identity";
import {PibImpl} from "../pib";
import {Signature} from "../../signature";
import {Blob, SignedBlob} from "../../util";
import {KeyLocator} from "../../key-locator";

export class SelfVerifyPolicyManager extends PolicyManager {
    /**
     * A SelfVerifyPolicyManager implements a PolicyManager to look up the public
     * key in the given storage. If the public key can't be found, the verification
     * fails.
     *
     * @param {IdentityStorage|PibImpl} storage (optional) The IdentityStorage or
     * PibImpl for looking up the public key. This object must remain valid during
     * the life of this SelfVerifyPolicyManager. If omitted, then don't look for a
     * public key with the name in the KeyLocator and rely on the KeyLocator having
     * the full public key DER.
     * @constructor
     */
    constructor(storage: IdentityStorage | PibImpl);

    /**
     * Check the type of signatureInfo to get the KeyLocator. Look in the storage
     * for the public key with the name in the KeyLocator (if available) and use it
     * to verify the signedBlob. If the public key can't be found, return false.
     * (This is a generalized method which can verify both a Data packet and an
     * Interest.)
     * @param {Signature} signatureInfo An object of a subclass of Signature, e.g.
     * Sha256WithRsaSignature.
     * @param {SignedBlob} signedBlob the SignedBlob with the signed portion to
     * verify.
     * @param {function} onComplete This calls onComplete(true, undefined) if the
     * signature verifies, otherwise onComplete(false, reason).
     */
    verify(signatureInfo: Signature, signedBlob: SignedBlob, onComplete: (verifies: boolean, reason: string) => any);

    /**
     * Look in the storage for the public key with the name in the KeyLocator (if
     * available). If the public key can't be found, return and empty Blob.
     * @param {KeyLocator} keyLocator The KeyLocator.
     * @param {function} onComplete This calls
     * onComplete(publicKeyDer, reason) where publicKeyDer is the public key
     * DER Blob or an isNull Blob if not found and reason is the reason
     * string if not found.
     */
    getPublicKeyDer(keyLocator: KeyLocator, onComplete: (publicKeyDer: Blob, reason: string) => any);


}