import {Interest} from "../../interest";

export class CertificateRequest {
    /**
     * A CertificateRequest represents a request for a certificate, associated with
     * the number of retries left. The interest_ and nRetriesLeft_ fields are public
     * so that you can modify them. interest_ is the Interest for the requested Data
     * packet or Certificate, and nRetriesLeft_ is the number of remaining retries
     * after a timeout or NACK.
     *
     * Create a CertificateRequest with an optional Interest.
     * @param {Interest} interest (optional) If supplied, create a
     * CertificateRequest with a copy of the interest and 3 retries left. Of omitted,
     * create a CertificateRequest with a default Interest object and 0 retries left.
     * @constructor
     */
    constructor(interest: Interest);
}