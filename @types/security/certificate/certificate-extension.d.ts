import {DerNode, OID} from "../../encoding";
import {Blob} from "../../util";

export class CertificateExtension {
    /**
     * A CertificateExtension represents the Extension entry in a certificate.
     * Create a new CertificateExtension.
     * @param {string|OID} oid The oid of subject description entry.
     * @param {boolean} isCritical If true, the extension must be handled.
     * @param {Blob} value The extension value.
     * @constructor
     */
    constructor(oid: string | OID, isCritical: boolean, value: Blob);

    /**
     * Encode the object into a DER syntax tree.
     * @return {DerNode} The encoded DER syntax tree.
     */
    toDer(): DerNode;

    toDerBlob(): Blob;

    getOid(): OID;

    getIsCritical(): boolean;

    getValue(): Blob;
}