import {IdentityCertificate} from "../certificate";
import {Name} from "../../name";

export class CertificateCache {
    /**
     * A CertificateCache is used to save other users' certificate during
     * verification.
     * @constructor
     */
    constructor();

    /**
     * Insert the certificate into the cache. Assumes the timestamp is not yet
     * removed from the name.
     * @param {IdentityCertificate} certificate The certificate to insert.
     */
    insertCertificate(certificate: IdentityCertificate);

    /**
     * Remove a certificate from the cache. This does nothing if it is not present.
     * @param {Name} certificateName The name of the certificate to remove. This
     * assumes there is no timestamp in the name.
     */
    deleteCertificate(certificateName: Name);

    /**
     * Fetch a certificate from the cache.
     * @param {Name} certificateName The name of the certificate to remove. This
     * assumes there is no timestamp in the name.
     * @return {IdentityCertificate} A new copy of the IdentityCertificate, or null
     * if not found.
     */
    getCertificate(certificateName: Name): IdentityCertificate;

    /**
     * Clear all certificates from the store.
     */
    reset();
}