import {Blob, SyncPromise} from "../../util";
import {DerNode} from "../../encoding/der";

export class PublicKey {
    /**
     * Create a new PublicKey by decoding the keyDer. Set the key type from the
     * decoding.
     * @param {Blob} keyDer The blob of the SubjectPublicKeyInfo DER.
     * @throws UnrecognizedKeyFormatException if can't decode the key DER.
     * @constructor
     */
    constructor(keyDer: Blob);

    /**
     * Encode the public key into DER.
     * @return {DerNode} The encoded DER syntax tree.
     */
    toDer(): DerNode;

    /**
     * Get the key type.
     * @return {number} The key type as an int from KeyType.
     */
    getKeyType(): number;

    /**
     * Get the digest of the public key.
     * @param {number} digestAlgorithm (optional) The integer from DigestAlgorithm,
     * such as DigestAlgorithm.SHA256. If omitted, use DigestAlgorithm.SHA256 .
     * @return {Blob} The digest value.
     */
    getDigest(digestAlgorithm?: number): Blob;

    /**
     * Get the raw bytes of the public key in DER format.
     * @return {Blob} The public key DER.
     */
    getKeyDer(): Blob;

    /**
     * Encrypt the plainData using the keyBits according the encrypt algorithm type.
     * @param {Blob|Buffer} plainData The data to encrypt.
     * @param {number} algorithmType The algorithm type from the
     * EncryptAlgorithmType enum, e.g., RsaOaep.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the encrypted Blob.
     */
    encryptPromise(plainData: Blob | Buffer, algorithmType: number, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Encrypt the plainData using the keyBits according the encrypt algorithm type.
     * @param {Blob|Buffer} plainData The data to encrypt.
     * @param {number} algorithmType The algorithm type from the
     * EncryptAlgorithmType enum, e.g., RsaOaep.
     * @return {Blob} The encrypted data.
     * @throws Error If encryptPromise doesn't return a SyncPromise which is
     * already fulfilled.
     */
    encrypt(plainData: Blob | Buffer, algorithmType: number): Blob;

    static RSA_ENCRYPTION_OID: string;
    static EC_ENCRYPTION_OID: string;
}