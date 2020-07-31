import {CertificateV2} from "./certificate-v2";
import {Name} from "../../name";

export interface CertificateContainerInterface {
    /**
     * Add the certificate to the container.
     * @param {CertificateV2} certificate The certificate to add, which is copied.
     */
    add(certificate: CertificateV2);

    /**
     * Remove the certificate with the given name. If the name does not exist,
     * do nothing.
     * @param {Name} certificateName The name of the certificate.
     */
    remove(certificateName: Name);
}