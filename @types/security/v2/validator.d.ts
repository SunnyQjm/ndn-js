import {ValidationPolicy} from "./validation-policy";
import {CertificateFetcher} from "./certificate-fetcher";
import {Data} from "../../data";
import {Interest} from "../../interest";
import {ValidationError} from "./validation-error";

export class Validator {
    /**
     * The Validator class provides an interface for validating data and interest
     * packets.
     *
     * Every time a validation process is initiated, it creates a ValidationState
     * that exists until the validation finishes with either success or failure.
     * This state serves several purposes:
     * to record the Interest or Data packet being validated,
     * to record the failure callback,
     * to record certificates in the certification chain for the Interest or Data
     * packet being validated,
     * to record the names of the requested certificates in order to detect loops in
     * the certificate chain,
     * and to keep track of the validation chain size (also known as the validation
     * "depth").
     *
     * During validation, the policy and/or key fetcher can augment the validation
     * state with policy- and fetcher-specific information using tags.
     *
     * A Validator has a trust anchor cache to save static and dynamic trust
     * anchors, a verified certificate cache for saving certificates that are
     * already verified, and an unverified certificate cache for saving pre-fetched
     * but not yet verified certificates.
     *
     * Create a Validator with the policy and fetcher.
     * @param {ValidationPolicy} policy The validation policy to be associated with
     * this validator.
     * @param {CertificateFetcher} certificateFetcher (optional) The certificate
     * fetcher implementation. If omitted, use a CertificateFetcherOffline (assuming
     * that the validation policy doesn't need to fetch certificates).
     * @constructor
     */
    constructor(policy: ValidationPolicy, certificateFetcher: CertificateFetcher);

    /**
     * Get the ValidationPolicy given to the constructor.
     * @return {ValidationPolicy} The ValidationPolicy.
     */
    getPolicy(): ValidationPolicy;

    /**
     * Get the CertificateFetcher given to (or created in) the constructor.
     * @return {CertificateFetcher} The CertificateFetcher.
     */
    getFetcher(): CertificateFetcher;

    /**
     * Set the maximum depth of the certificate chain.
     * @param {number} maxDepth The maximum depth.
     */
    setMaxDepth(maxDepth: number);

    /**
     * Get the maximum depth of the certificate chain.
     * @return {number} The maximum depth.
     */
    getMaxDepth(): number;

    /**
     * Asynchronously validate the Data or Interest packet.
     * @param {Data|Interest} dataOrInterest The Data or Interest packet to validate,
     * which is copied.
     * @param {function} successCallback On validation success, this calls
     * successCallback(dataOrInterest).
     * @param {function} failureCallback On validation failure, this calls
     * failureCallback(dataOrInterest, error) where error is a ValidationError.
     */
    validate(dataOrInterest: Data | Interest, successCallback: (dataOrInterest: Data | Interest) => any,
             failureCallback: (dataOrInterest: Data | Interest, error: ValidationError) => any);
}