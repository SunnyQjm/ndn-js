import {CertificateStorage} from "./certificate-storage";
import {CertificateRequest} from "./certificate-request";
import {ValidationState} from "./validation-state";
import {CertificateV2} from "./certificate-v2";

export class CertificateFetcher {
    /**
     * CertificateFetcher is an abstract base class which provides an interface used
     * by the validator to fetch missing certificates.
     * @constructor
     */
    constructor();

    /**
     * Assign the certificate storage used to check for known certificates and to
     * cache unverified ones.
     * @param {CertificateStorage} certificateStorage The certificate storage object
     * which must be valid for the lifetime of this CertificateFetcher.
     */
    setCertificateStorage(certificateStorage: CertificateStorage);

    /**
     * Asynchronously fetch a certificate. setCertificateStorage must have been
     * called first.
     * If the requested certificate exists in the storage, then this method will
     * immediately call continueValidation with the certificate. If certificate is
     * not available, then the implementation-specific doFetch will be called to
     * asynchronously fetch the certificate. The successfully-retrieved
     * certificate will be automatically added to the unverified cache of the
     * certificate storage.
     * When the requested certificate is retrieved, continueValidation is called.
     * Otherwise, the fetcher implementation calls state.failed() with the
     * appropriate error code and diagnostic message.
     * @param {CertificateRequest} certificateRequest The the request with the
     * Interest for fetching the certificate.
     * @param {ValidationState} state The validation state.
     * @param {function} continueValidation After fetching, this calls
     * continueValidation(certificate, state) where certificate is the fetched
     * certificate and state is the ValidationState.
     */
    fetch(certificateRequest: CertificateRequest, state: ValidationState, continueValidation: (certificate: CertificateV2, state: ValidationState) => any);


}