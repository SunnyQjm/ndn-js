import {Name} from "../name";
import {Data} from "../data";
import {Blob} from "../util";
import {WireFormat} from "../encoding";

export class SafeBag {
    /**
     * A SafeBag represents a container for sensitive related information such as a
     * certificate and private key.
     *
     * There are three forms of the SafeBag constructor:
     * SafeBag(certificate, privateKeyBag) - Create a SafeBag with the given
     * certificate and private key.
     * SafeBag(keyName, privateKeyBag, publicKeyEncoding [, password,
     *         digestAlgorithm, wireFormat]) - Create a SafeBag with given private
     * key and a new self-signed certificate for the given public key.
     * SafeBag(input) - Create a SafeBag by decoding the input as an NDN-TLV SafeBag.
     * @param {Data} certificate The certificate data packet (used only for
     * SafeBag(certificate, privateKeyBag)). This copies the object.
     * @param {Blob) privateKeyBag The encoded private key. If encrypted, this is a
     * PKCS #8 EncryptedPrivateKeyInfo. If not encrypted, this is an unencrypted
     * PKCS #8 PrivateKeyInfo.
     * @param {Buffer} password (optional) The password for decrypting the private
     * key in order to sign the self-signed certificate, which should have
     * characters in the range of 1 to 127. If the password is supplied, use it to
     * decrypt the PKCS #8 EncryptedPrivateKeyInfo. If the password is omitted or
     * null, privateKeyBag is an unencrypted PKCS #8 PrivateKeyInfo.
     * @param {number} digestAlgorithm: (optional) The digest algorithm for signing
     * the self-signed certificate (as an int from the DigestAlgorithm enum). If
     * omitted, use DigestAlgorithm.SHA256 .
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the self-signed certificate in order to sign it. If omitted, use
     * WireFormat.getDefaultWireFormat().
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     * @constructor
     */
    constructor(certificate: Data, privateKeyBag: Blob);
    constructor(keyName: Name, privateKeyBag: Blob, publicKeyEncoding: Blob, password?: Blob,digestAlgorithm?: number, wireFormat?: WireFormat);
    constructor(input: Blob | Buffer);

    /**
     * Get the certificate data packet.
     * @return {Data} The certificate as a Data packet. If you need to process it
     * as a certificate object then you must create a new CertificateV2(data).
     */
    getCertificate(): Data

    /**
     * Get the encoded private key.
     * @return {Blob} The encoded private key. If encrypted, this is a PKCS #8
     * EncryptedPrivateKeyInfo. If not encrypted, this is an unencrypted PKCS #8
     * PrivateKeyInfo.
     */
    getPrivateKeyBag(): Blob;

    /**
     * Decode the input as an NDN-TLV SafeBag and update this object.
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     */
    wireDecode(input: Blob | Buffer): void;

    /**
     * Encode this as an NDN-TLV SafeBag.
     * @return {Blob} The encoded buffer in a Blob object.
     */
    wireEncode(): Blob;


}