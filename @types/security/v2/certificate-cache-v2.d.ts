import {CertificateV2} from "./certificate-v2";
import {Name} from "../../name";
import {Interest} from "../../interest";

export class CertificateCacheV2 {
    /**
     * A CertificateCacheV2 holds other user's verified certificates in security v2
     * format CertificateV2. A certificate is removed no later than its NotAfter
     * time, or maxLifetime after it has been added to the cache.
     *
     * Create a CertificateCacheV2.
     * @param {number} maxLifetimeMilliseconds (optional) The maximum time that
     * certificates can live inside the cache, in milliseconds. If omitted, use
     * getDefaultLifetime().
     * @constructor
     */
    constructor(maxLifetimeMilliseconds: number);

    /**
     * Insert the certificate into the cache. The inserted certificate will be
     * removed no later than its NotAfter time, or maxLifetimeMilliseconds given to
     * the constructor.
     * @param {CertificateV2} certificate The certificate object, which is copied.
     */
    insert(certificate: CertificateV2);

    /**
     * Find the certificate by the given prefix or interest.
     * @param {Name|Interest} prefixOrInterest If a Name, return the first
     * certificate (ordered by name) where the Name is a prefix of the certificate
     * name. If an Interest, return the first certificate (ordered by Name) where
     * interest.matchesData(certificate) .
     * @return {CertificateV2}  The found certificate, or null if not found. You
     * must not modify the returned object. If you need to modify it, then make a
     * copy.
     * @note ChildSelector is not supported.
     */
    find(prefixOrInterest: Name | Interest): CertificateV2;

    /**
     * Remove the certificate whose name equals the given name. If no such
     * certificate is in the cache, do nothing.
     * @param {Name} certificateName The name of the certificate.
     */
    deleteCertificate(certificateName: Name);

    /**
     * Clear all certificates from the cache.
     */
    clear();

    /**
     * Get the default maximum lifetime (1 hour).
     * @return {number} The lifetime in milliseconds.
     */
    static getDefaultLifetime(): number;
}