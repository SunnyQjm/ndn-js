import {CertificateContainerInterface} from "./certificate-container-interface";
import {TrustAnchorGroup} from "./trust-anchor-group";

export class DynamicTrustAnchorGroup extends TrustAnchorGroup {
    /**
     * The DynamicTrustAnchorGroup class extends TrustAnchorGroup to implement a
     * dynamic trust anchor group.
     *
     * Create a DynamicTrustAnchorGroup to use an existing container.
     * @param {CertificateContainer} certificateContainer The existing certificate
     * container which implements the CertificateContainer interface.
     * @param {string} id The group ID.
     * @param {string} path The file path for trust anchor(s), which could be a
     * directory or a file. If it is a directory, all the certificates in the
     * directory will be loaded.
     * @param {number} refreshPeriod  The refresh time in milliseconds for the
     * anchors under path. This must be positive.
     * @param {boolean} isDirectory If true, then path is a directory. If false, it
     * is a single file.
     * @throws Error If refreshPeriod is not positive.
     * @constructor
     */
    constructor(certificateContainer: CertificateContainerInterface, id: string, path: string, refreshPeriod: number,
                isDirectory: boolean);


}