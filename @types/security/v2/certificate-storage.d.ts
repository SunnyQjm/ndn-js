import {Interest} from "../../interest";
import {CertificateV2} from "./certificate-v2";
import {Name} from "../../name";
import {TrustAnchorContainer} from "./trust-anchor-container";
import {CertificateCacheV2} from "./certificate-cache-v2";

export class CertificateStorage {
    /**
     * The CertificateStorage class stores trusted anchors and has a verified
     * certificate cache, and an unverified certificate cache.
     *
     * @constructor
     */
    constructor();

    /**
     * Find a trusted certificate in the trust anchor container or in the
     * verified cache.
     * @param {Interest} interestForCertificate The Interest for the certificate.
     * @return {CertificateV2} The found certificate, or null if not found.
     */
    findTrustedCertificate(interestForCertificate: Interest): CertificateV2;

    /**
     * Check if the certificate with the given name prefix exists in the verified
     * cache, the unverified cache, or in the set of trust anchors.
     * @param {Name} certificatePrefix The certificate name prefix.
     * @return {boolean} True if the certificate is known.
     */
    isCertificateKnown(certificatePrefix: Name): boolean;

    /**
     * Cache the unverified certificate for a period of time (5 minutes).
     * @param {CertificateV2} certificate The certificate packet, which is copied.
     */
    cacheUnverifiedCertificate(certificate: CertificateV2);

    /**
     * Get the trust anchor container.
     * @return {TrustAnchorContainer} The trust anchor container.
     */
    getTrustAnchors(): TrustAnchorContainer;

    /**
     * Get the verified certificate cache.
     * @return {CertificateCacheV2} The verified certificate cache.
     */
    getVerifiedCertificateCache(): CertificateCacheV2;

    /**
     * Get the unverified certificate cache.
     * @return {CertificateCacheV2} The unverified certificate cache.
     */
    getUnverifiedCertificateCache(): CertificateCacheV2;

    /**
     * There are two forms of loadAnchor:
     * loadAnchor(groupId, certificate) - Load a static trust anchor. Static trust
     * anchors are permanently associated with the validator and never expire.
     * loadAnchor(groupId, path, refreshPeriod, isDirectory) - Load dynamic trust
     * anchors. Dynamic trust anchors are associated with the validator for as long
     * as the underlying trust anchor file (or set of files) exists.
     * @param {String} groupId The certificate group id.
     * @param {CertificateV2} certificate The certificate to load as a trust anchor,
     * which is copied.
     * @param {String} path The path to load the trust anchors.
     * @param {number} refreshPeriod  The refresh time in milliseconds for the
     * anchors under path. This must be positive. The relevant trust anchors will
     * only be updated when find is called.
     * @param {boolean} isDirectory (optional) If true, then path is a directory.
     * If false or omitted, it is a single file.
     */
    loadAnchor(groupId: string, certificateOrPath: CertificateV2 | string, refreshPeriod: number, isDirectory: boolean);

    /**
     * Remove any previously loaded static or dynamic trust anchors.
     */
    resetAnchors();

    /**
     * Cache the verified certificate a period of time (1 hour).
     * @param {CertificateV2} certificate The certificate object, which is copied.
     */
    cacheVerifiedCertificate(certificate: CertificateV2);

    /**
     * Remove any cached verified certificates.
     */
    resetVerifiedCertificates();
}