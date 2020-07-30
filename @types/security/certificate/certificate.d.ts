import {Data} from "../../data";
import {CertificateSubjectDescription} from "./certificate-subject-description";
import {CertificateExtension} from "./certificate-extension";
import {PublicKey} from "./public-key";
import {Blob} from "../../util";
import {DerNode} from "../../encoding/der";
import {WireFormat} from "../../encoding";

export class Certificate {
    /**
     * Create a Certificate from the content in the data packet (if not omitted).
     * @param {Data} data (optional) The data packet with the content to decode.
     * If omitted, create a Certificate with default values and the Data content
     * is empty.
     * @constructor
     */
    constructor(data: Data);

    /**
     * Encode the contents of the certificate in DER format and set the Content
     * and MetaInfo fields.
     */
    encode();

    /**
     * Add a subject description.
     * @param {CertificateSubjectDescription} description The description to be added.
     */
    addSubjectDescription(description: CertificateSubjectDescription);

    /**
     * Get the subject description list.
     * @return {Array<CertificateSubjectDescription>} The subject description list.
     */
    getSubjectDescriptionList(): CertificateSubjectDescription[];

    /**
     * Add a certificate extension.
     * @param {CertificateExtension} extension The extension to be added.
     */
    addExtension(extension: CertificateExtension);

    /**
     * Get the certificate extension list.
     * @return {Array<CertificateExtension>} The extension list.
     */
    getExtensionList(): CertificateExtension[];

    setNotBefore(notBefore: number);

    getNotBefore(): number;

    setNotAfter(notAfter: number);

    getNotAfter(): number;

    setPublicKeyInfo(key: PublicKey);

    getPublicKeyInfo(): PublicKey;

    /**
     * Get the public key DER encoding.
     * @return {Blob} The DER encoding Blob.
     * @throws Error if the public key is not set.
     */
    getPublicKeyDer(): Blob;

    /**
     * Check if the certificate is valid.
     * @return {Boolean} True if the current time is earlier than notBefore.
     */
    isTooEarly(): boolean;

    /**
     * Check if the certificate is valid.
     * @return {Boolean} True if the current time is later than notAfter.
     */
    isTooLate(): boolean;

    isInValidityPeriod(): boolean;

    /**
     * Encode the certificate fields in DER format.
     * @return {DerSequence} The DER encoded contents of the certificate.
     */
    toDer(): DerNode.DerSequence;

    /**
     * Populate the fields by the decoding DER data from the Content.
     */
    decode();

    /**
     * Override to call the base class wireDecode then populate the certificate
     * fields.
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to decode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     */
    wireDecode(input: Blob | Buffer, wireFormat: WireFormat);

    toString(): string;

    /**
     * Convert a UNIX timestamp to ISO time representation with the "T" in the middle.
     * @param {type} msSince1970 Timestamp as milliseconds since Jan 1, 1970.
     * @return {string} The string representation.
     */
    static toIsoString(msSince1970: number): string;

    /**
     * A private method to zero pad an integer to 2 digits.
     * @param {number} x The number to pad.  Assume it is a non-negative integer.
     * @return {string} The padded string.
     */
    static to2DigitString(x: number): string;
}