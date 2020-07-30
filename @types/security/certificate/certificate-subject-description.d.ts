import {DerNode, OID} from "../../encoding";

export class CertificateSubjectDescription {
    /**
     * A CertificateSubjectDescription represents the SubjectDescription entry in a
     * Certificate.
     * Create a new CertificateSubjectDescription.
     * @param {string|OID} oid The oid of the subject description entry.
     * @param {string} value The value of the subject description entry.
     * @constructor
     */
    constructor(oid: string | OID, value: string);

    /**
     * Encode the object into a DER syntax tree.
     * @return {DerNode} The encoded DER syntax tree.
     */
    toDer(): DerNode;

    getOidString(): string;

    getValue(): string;
}