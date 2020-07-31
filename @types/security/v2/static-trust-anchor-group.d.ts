import {CertificateContainerInterface} from "./certificate-container-interface";
import {TrustAnchorGroup} from "./trust-anchor-group";
import {CertificateV2} from "./certificate-v2";
import {Name} from "../../name";

export class StaticTrustAnchorGroup extends TrustAnchorGroup {
    /**
     * The StaticTrustAnchorGroup class extends TrustAnchorGroup to implement a
     * static trust anchor group.
     *
     * Create a StaticTrustAnchorGroup to use an existing container.
     * @param {CertificateContainer} certificateContainer The existing certificate
     * container which implements the CertificateContainer interface.
     * @param {string} id The group ID.
     * @constructor
     */
    constructor(certificateContainer: CertificateContainerInterface, id: string);

    /**
     * Load the static anchor certificate. If a certificate with the name is already
     * added, do nothing.
     * @param {CertificateV2} certificate The certificate to add, which is copied.
     */
    add(certificate: CertificateV2);

    /**
     * Remove the static anchor with the certificate name.
     * @param {Name} certificateName The certificate name.
     */
    remove(certificateName: Name);
}