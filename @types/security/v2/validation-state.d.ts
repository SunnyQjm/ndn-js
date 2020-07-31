import {ValidationError} from "./validation-error";
import {Name} from "../../name";
import {CertificateV2} from "./certificate-v2";

export class ValidationState {
    /**
     * ValidationState is an abstract base class for DataValidationState and
     * InterestValidationState.
     *
     * One instance of the validation state is kept for the validation of the whole
     * certificate chain.
     *
     * The state collects the certificate chain that adheres to the selected
     * validation policy to validate data or interest packets. Certificate, data,
     * and interest packet signatures are verified only after the validator
     * determines that the chain terminates with a trusted certificate (a trusted
     * anchor or a previously validated certificate). This model allows filtering
     * out invalid certificate chains without incurring (costly) cryptographic
     * signature verification overhead and mitigates some forms of denial-of-service
     * attacks.
     *
     * A validation policy and/or key fetcher may add custom information associated
     * with the validation state using tags.
     * @constructor
     */
    constructor();

    /**
     * Check if validation failed or success has been called.
     * @return {boolean} True if validation failed or success has been called.
     */
    hasOutcome(): boolean;

    /**
     * Check if validation failed has been called.
     * @return {boolean} True if validation failed has been called, false if no
     * validation callbacks have been called or validation success was called.
     */
    isOutcomeFailed(): boolean;

    /**
     * Check if validation success has been called.
     * @return {boolean} True if validation success has been called, false if no
     * validation callbacks have been called or validation failed was called.
     */
    isOutcomeSuccess(): boolean;

    /**
     * Call the failure callback.
     * @param {ValidationError} error
     */
    fail(error: ValidationError);

    /**
     * Get the depth of the certificate chain.
     * @return {number} The depth of the certificate chain.
     */
    getDepth(): number;

    /**
     * Check if certificateName has been previously seen, and record the supplied
     * name.
     * @param {Name} certificateName The certificate name, which is copied.
     * @return {boolean} True if certificateName has been previously seen.
     */
    hasSeenCertificateName(certificateName: Name): boolean;

    /**
     * Add the certificate to the top of the certificate chain.
     * If the certificate chain is empty, then the certificate should be the
     * signer of the original packet. If the certificate chain is not empty, then
     * the certificate should be the signer of the front of the certificate chain.
     * @note This function does not verify the signature bits.
     * @param {CertificateV2} certificate The certificate to add, which is copied.
     */
    addCertificate(certificate: CertificateV2);

    /**
     * Set the outcome to the given value, and set hasOutcome_ true.
     * @param {boolean} outcome The outcome.
     * @throws Error If this ValidationState already has an outcome.
     */
    setOutcome(outcome: boolean);


}