import {Data} from "../../data";
import {Name} from "../../name";
import {Blob} from "../../util";
import {ValidityPeriod} from "../validity-period";
import {WireFormat} from "../../encoding";

export class CertificateV2 {
    /**
     * CertificateV2 represents a certificate following the certificate format
     * naming convention.
     *
     * Overview of the NDN certificate format:
     *
     *     CertificateV2 ::= DATA-TLV TLV-LENGTH
     *                         Name      (= /<NameSpace>/KEY/[KeyId]/[IssuerId]/[Version])
     *                         MetaInfo  (.ContentType = KEY)
     *                         Content   (= X509PublicKeyContent)
     *                         SignatureInfo (= CertificateV2SignatureInfo)
     *                         SignatureValue
     *
     *     X509PublicKeyContent ::= CONTENT-TLV TLV-LENGTH
     *                                BYTE+ (= public key bits in PKCS#8 format)
     *
     *     CertificateV2SignatureInfo ::= SIGNATURE-INFO-TYPE TLV-LENGTH
     *                                      SignatureType
     *                                      KeyLocator
     *                                      ValidityPeriod
     *                                      ... optional critical or non-critical extension blocks ...
     *
     * An example of NDN certificate name:
     *
     *     /edu/ucla/cs/yingdi/KEY/%03%CD...%F1/%9F%D3...%B7/%FD%d2...%8E
     *     \_________________/    \___________/ \___________/\___________/
     *    Certificate Namespace      Key Id       Issuer Id     Version
     *         (Identity)
     *     \__________________________________/
     *                   Key Name
     *
     * Notes:
     *
     * - `Key Id` is an opaque name component to identify the instance of the public
     *   key for the certificate namespace. The value of `Key ID` is controlled by
     *   the namespace owner. The library includes helpers for generating key IDs
     *   using an 8-byte random number, SHA-256 digest of the public key, timestamp,
     *   and the specified numerical identifiers.
     *
     * - `Issuer Id` is sn opaque name component to identify the issuer of the
     *   certificate. The value is controlled by the issuer. The library includes
     *   helpers to set issuer the ID to an 8-byte random number, SHA-256 digest of
     *   the issuer's public key, and the specified numerical identifiers.
     *
     * - `Key Name` is a logical name of the key used for management purposes. the
     *    Key Name includes the certificate namespace, keyword `KEY`, and `KeyId`
     *    components.
     *
     * @see https://github.com/named-data/ndn-cxx/blob/master/docs/specs/certificate-format.rst
     *
     * Create a CertificateV2 from the content in the Data packet (if not omitted).
     * @param {Data} data (optional) The data packet with the content to copy.
     * If omitted, create a CertificateV2 with content type KEY and default or
     * unspecified values.
     * @constructor
     */
    constructor(data: Data);

    /**
     * Get key name from the certificate name.
     * @return {Name} The key name as a new Name.
     */
    getKeyName(): Name;

    /**
     * Get the identity name from the certificate name.
     * @return {Name} The identity name as a new Name.
     */
    getIdentity(): Name;

    /**
     * Get the key ID component from the certificate name.
     * @return {Name.Component} The key ID name component.
     */
    getKeyId(): Name.Component;

    /**
     * Get the issuer ID component from the certificate name.
     * @return {Name.Component} The issuer ID component.
     */
    getIssuerId(): Name.Component;

    /**
     * Get the public key DER encoding.
     * @return {Blob} The DER encoding Blob.
     * @throws CertificateV2.Error If the public key is not set.
     */
    getPublicKey(): Blob;

    /**
     * Get the certificate validity period from the SignatureInfo.
     * @return {ValidityPeriod} The ValidityPeriod object.
     * @throws InvalidArgumentException If the SignatureInfo doesn't have a
     * ValidityPeriod.
     */
    getValidityPeriod(): ValidityPeriod;

    /**
     * Check if the time falls within the validity period.
     * @param {number} time (optional) The time to check as milliseconds since
     * Jan 1, 1970 UTC. If omitted, use the current time.
     * @return {boolean} True if the beginning of the validity period is less than
     * or equal to time and time is less than or equal to the end of the validity
     * period.
     * @throws InvalidArgumentException If the SignatureInfo doesn't have a
     * ValidityPeriod.
     */
    isValid(time: number): boolean;

    // TODO: getExtension

    /**
     * Override to call the base class wireDecode then check the certificate format.
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to decode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     */
    wireDecode(input: Blob | Buffer, wireFormat?: WireFormat): void;

    /**
     * Get a string representation of this certificate.
     * @return {string} The string representation.
     */
    toString(): string;

    /**
     * Check if certificateName follows the naming convention for a certificate.
     * @param {Name} certificateName The name of the certificate.
     * @return {boolean} True if certificateName follows the naming convention.
     */
    isValidName(certificateName: Name): boolean;

    /**
     * Extract the identity namespace from certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @return {Name} The identity namespace as a new Name.
     */
    extractIdentityFromCertName(certificateName: Name): Name;

    /**
     * Extract key name from certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @return {Name} The key name as a new Name.
     */
    extractKeyNameFromCertName(certificateName: Name): Name;

    static VERSION_OFFSET: number;
    static ISSUER_ID_OFFSET: number;
    static KEY_ID_OFFSET: number;
    static KEY_COMPONENT_OFFSET: number;
    static MIN_CERT_NAME_LENGTH: number;
    static MIN_KEY_NAME_LENGTH: number;
    static KEY_COMPONENT: Name.Component;
}

export namespace CertificateV2 {
    class CertificateV2Error {
        constructor(error: any);
    }

    type Error = CertificateV2Error;
}