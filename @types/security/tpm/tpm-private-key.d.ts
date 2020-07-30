import {Blob, SyncPromise} from "../../util";
import {KeyParams} from "../key-params";
import {DerNode, OID, RSAKey} from "../../encoding";

export class TpmPrivateKey {
    /**
     * A TpmPrivateKey holds an in-memory private key and provides cryptographic
     * operations such as for signing by the in-memory TPM.
     *
     * Create an uninitialized TpmPrivateKey. You must call a load method to
     * initialize it, such as loadPkcs1.
     * @constructor
     */
    constructor();

    /**
     * Load the unencrypted private key from a buffer with the PKCS #1 encoding.
     * This replaces any existing private key in this object.
     * @param {Buffer} encoding The byte buffer with the private key encoding.
     * @param {number} keyType (optional) The KeyType, such as KeyType.RSA. If
     * omitted or null, then partially decode the private key to determine the key
     * type.
     * @throws TpmPrivateKey.Error for errors decoding the key.
     */
    loadPkcs1(encoding: Buffer, keyType: number);

    /**
     * Load the unencrypted private key from a buffer with the PKCS #8 encoding.
     * This replaces any existing private key in this object.
     * @param {Buffer} encoding The byte buffer with the private key encoding.
     * @param {number} keyType (optional) The KeyType, such as KeyType.RSA. If
     * omitted or null, then partially decode the private key to determine the key
     * type.
     * @throws TpmPrivateKey.Error for errors decoding the key.
     */
    loadPkcs8(encoding: Buffer, keyType: number);

    /**
     * Load the encrypted private key from a buffer with the PKCS #8 encoding of
     * the EncryptedPrivateKeyInfo.
     * This replaces any existing private key in this object. This partially
     * decodes the private key to determine the key type.
     * @param {Buffer} encoding The byte buffer with the private key encoding.
     * @param {Buffer} password The password for decrypting the private key, which
     * should have characters in the range of 1 to 127.
     * @throws TpmPrivateKey.Error for errors decoding the key.
     */
    loadEncryptedPkcs8(encoding: Buffer, password: Buffer);

    /**
     * Get the encoded public key for this private key.
     * @return {Blob} The public key encoding Blob.
     * @throws TpmPrivateKey.Error if no private key is loaded, or error converting
     * to a public key.
     */
    derivePublicKey(): Blob;

    /**
     * Decrypt the cipherText using this private key according the encryption
     * algorithmType. Only RSA encryption is supported for now.
     * @param {Buffer} cipherText The cipher text byte buffer.
     * @param {number} algorithmType (optional) This decrypts according to
     * algorithmType which is an int from the EncryptAlgorithmType enum. If omitted,
     * use RsaOaep.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the decrypted data Blob,
     * or a promise rejected with TpmPrivateKey.Error if the private key is not
     * loaded, if decryption is not supported for this key type, or for error
     * decrypting.
     */
    decryptPromise(cipherText: Buffer, algorithmType: number, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Sign the data with this private key, returning a signature Blob.
     * @param {Buffer} data The input byte buffer.
     * @param {number} digestAlgorithm The digest algorithm as an int from the
     * DigestAlgorithm enum.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the signature Blob (or
     * an isNull Blob if this private key is not initialized), or a promise rejected
     * with TpmPrivateKey.Error for unrecognized digestAlgorithm or an error in
     * signing.
     */
    signPromise(data: Buffer, digestAlgorithm: number, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Get the encoded unencrypted private key in PKCS #1.
     * @return {Blob} The private key encoding Blob.
     * @throws {TpmPrivateKey.Error} If no private key is loaded, or error encoding.
     */
    toPkcs1(): Blob;

    /**
     * Get the encoded unencrypted private key in PKCS #8.
     * @return {Blob} The private key encoding Blob.
     * @throws {TpmPrivateKey.Error} If no private key is loaded, or error encoding.
     */
    toPkcs8(): Blob;

    /**
     * Get the encoded encrypted private key in PKCS #8.
     * @param {Buffer} password The password for encrypting the private key, which
     * should have characters in the range of 1 to 127.
     * @return {Blob} The encoding Blob of the EncryptedPrivateKeyInfo.
     * @throws {TpmPrivateKey.Error} If no private key is loaded, or error encoding.
     */
    toEncryptedPkcs8(password: Buffer): Blob;

    /**
     * Generate a key pair according to keyParams and return a new TpmPrivateKey
     * with the private key. You can get the public key with derivePublicKey.
     * @param {KeyParams} keyParams The parameters of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the new TpmPrivateKey,
     * or a promise rejected with Error if the key type is not supported, or a
     * promise rejected with TpmPrivateKey.Error for an invalid key size, or an
     * error generating.
     */
    generatePrivateKeyPromise(keyParams: KeyParams, useSync?: boolean): Promise<TpmPrivateKey> | SyncPromise;

    /**
     * Encode the private key to a PKCS #8 private key. We do this explicitly here
     * to avoid linking to extra OpenSSL libraries.
     * @param {Buffer} privateKeyDer The input private key DER.
     * @param {OID} oid The OID of the privateKey.
     * @param {DerNode} parameters The DerNode of the parameters for the OID.
     * @return {Blob} The PKCS #8 private key DER.
     */
    encodePkcs8PrivateKey(privateKeyDer: Buffer, oid: OID, parameters: DerNode): Blob;

    /**
     * Encode the RSAKey private key as a PKCS #1 private key.
     * @param {RSAKey} rsaKey The RSAKey private key.
     * @return {Blob} The PKCS #1 private key DER.
     */
    encodePkcs1PrivateKeyFromRSAKey(rsaKey: RSAKey): Blob;

    /**
     * Encode the public key values in the RSAKey private key as a
     * SubjectPublicKeyInfo.
     * @param {RSAKey} rsaKey The RSAKey private key with the public key values.
     * @return {Blob} The SubjectPublicKeyInfo DER.
     */
    encodePublicKeyFromRSAKey(rsaKey: RSAKey): Blob;

    /**
     * Convert a BigInteger to a Buffer.
     * @param {BigInteger} bigInteger The BigInteger.
     * @return {Buffer} The Buffer.
     */
    bigIntegerToBuffer(bigInteger: BigInteger): Buffer;

    
}

export namespace TpmPrivateKey {
    class TpmPrivateKeyError {
        constructor(error: any);
    }

    type Error = TpmPrivateKeyError;
}