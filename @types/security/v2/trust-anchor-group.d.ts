import {CertificateContainerInterface} from "./certificate-container-interface";
import {CertificateV2} from "./certificate-v2";

export class TrustAnchorGroup {
    /**
     * TrustAnchorGroup represents a group of trust anchors which implement the
     * CertificateContainer interface.
     *
     * Create a TrustAnchorGroup to use an existing container.
     * @param {CertificateContainerInterface} certificateContainer The existing certificate
     * container which implements the CertificateContainer interface.
     * @param {string} id The group ID.
     * @constructor
     */
    constructor(certificateContainer: CertificateContainerInterface, id: string);

    /**
     * Get the group id given to the constructor.
     * @return {string} The group id.
     */
    getId(): string;

    /**
     * Get the number of certificates in the group.
     * @return {number} The number of certificates.
     */
    size(): number;

    /**
     * Request a certificate refresh. The base method does nothing.
     */
    refresh();

    /**
     * Read a base-64-encoded certificate from a file.
     * @param {string} filePath The certificate file path.
     * @return {CertificateV2} The decoded certificate, or null if there is an
     * error.
     */
    static readCertificate(filePath: string): CertificateV2;
}