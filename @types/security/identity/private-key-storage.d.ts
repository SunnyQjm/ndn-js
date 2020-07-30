import {Name} from "../../name";
import {Blob, SyncPromise} from "../../util";
import {KeyParams} from "../key-params";
import {PublicKey} from "../certificate";
import {DerNode, OID, RSAKey} from "../../encoding";

export class PrivateKeyStorage {

    /**
     * Generate a pair of asymmetric keys.
     * @param {Name} keyName The name of the key pair.
     * @param {KeyParams} params The parameters of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the pair is
     * generated.
     */
    generateKeyPairPromise(keyName: Name, params: KeyParams, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Generate a pair of asymmetric keys.
     * @param {Name} keyName The name of the key pair.
     * @param {KeyParams} params The parameters of the key.
     * @throws Error If generateKeyPairPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    generateKeyPair(keyName: Name, params: KeyParams);

    /**
     * Delete a pair of asymmetric keys. If the key doesn't exist, do nothing.
     * @param {Name} keyName The name of the key pair.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the key pair is
     * deleted.
     */
    deleteKeyPairPromise(keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete a pair of asymmetric keys. If the key doesn't exist, do nothing.
     * @param {Name} keyName The name of the key pair.
     * @throws Error If deleteKeyPairPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    deleteKeyPair(keyName: Name);

    /**
     * Get the public key
     * @param {Name} keyName The name of public key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the PublicKey.
     */
    getPublicKeyPromise(keyName: Name, useSync?: boolean): Promise<PublicKey> | SyncPromise;

    /**
     * Get the public key
     * @param {Name} keyName The name of public key.
     * @return {PublicKey} The public key.
     * @throws Error If getPublicKeyPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    getPublicKey(keyName: Name): PublicKey;

    /**
     * Fetch the private key for keyName and sign the data to produce a signature Blob.
     * @param {Buffer} data Pointer to the input byte array.
     * @param {Name} keyName The name of the signing key.
     * @param {number} digestAlgorithm (optional) The digest algorithm from
     * DigestAlgorithm, such as DigestAlgorithm.SHA256. If omitted, use
     * DigestAlgorithm.SHA256.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the signature Blob.
     */
    signPromise(data: Buffer, keyName: Name, digestAlgorithm: number, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Fetch the private key for keyName and sign the data to produce a signature Blob.
     * @param {Buffer} data Pointer to the input byte array.
     * @param {Name} keyName The name of the signing key.
     * @param {number} digestAlgorithm (optional) The digest algorithm from
     * DigestAlgorithm, such as DigestAlgorithm.SHA256. If omitted, use
     * DigestAlgorithm.SHA256.
     * @return {Blob} The signature Blob.
     * @throws Error If signPromise doesn't return a SyncPromise which is already
     * fulfilled.
     */
    sign(data: Buffer, keyName: Name, digestAlgorithm: number): Blob;

    /**
     * Decrypt data.
     * @param {Name} keyName The name of the decrypting key.
     * @param {Buffer} data The byte to be decrypted.
     * @param {boolean} isSymmetric (optional) If true symmetric encryption is used,
     * otherwise asymmetric encryption is used. If omitted, use asymmetric
     * encryption.
     * @return {Blob} The decrypted data.
     */
    decrypt(keyName: Name, data: Buffer, isSymmetric?: boolean): Blob;

    /**
     * Encrypt data.
     * @param {Name} keyName The name of the encrypting key.
     * @param {Buffer} data The byte to be encrypted.
     * @param {boolean} isSymmetric (optional) If true symmetric encryption is used,
     * otherwise asymmetric encryption is used. If omitted, use asymmetric
     * encryption.
     * @return {Blob} The encrypted data.
     */
    encrypt(keyName: Name, data: Buffer, isSymmetric?: boolean): Blob;

    /**
     * Generate a symmetric key.
     * @param {Name} keyName The name of the key.
     * @param {KeyParams} params The parameters of the key.
     */
    generateKey(keyName: Name, params: KeyParams);

    /**
     * Check if a particular key exists.
     * @param {Name} keyName The name of the key.
     * @param {number} keyClass The class of the key, e.g. KeyClass.PUBLIC,
     * KeyClass.PRIVATE, or KeyClass.SYMMETRIC.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if the key exists.
     */
    doesKeyExistPromise(keyName: Name, keyClass: number, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Check if a particular key exists.
     * @param {Name} keyName The name of the key.
     * @param {number} keyClass The class of the key, e.g. KeyClass.PUBLIC,
     * KeyClass.PRIVATE, or KeyClass.SYMMETRIC.
     * @return {boolean} True if the key exists.
     * @throws Error If doesKeyExistPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    doesKeyExist(keyName: Name, keyClass: number): boolean;

    /**
     * Encode the private key to a PKCS #8 private key. We do this explicitly here
     * to avoid linking to extra OpenSSL libraries.
     * @param {Buffer} privateKeyDer The input private key DER.
     * @param {OID} oid The OID of the privateKey.
     * @param {DerNode} parameters The DerNode of the parameters for the OID.
     * @return {Blob} The PKCS #8 private key DER.
     */
    static encodePkcs8PrivateKey(privateKeyDer: Buffer, oid: OID, parameters: DerNode): Blob;

    /**
     * Encode the RSAKey private key as a PKCS #1 private key.
     * @param {RSAKey} rsaKey The RSAKey private key.
     * @return {Blob} The PKCS #1 private key DER.
     */
    static encodePkcs1PrivateKeyFromRSAKey(rsaKey: RSAKey): Blob;

    /**
     * Encode the public key values in the RSAKey private key as a
     * SubjectPublicKeyInfo.
     * @param {RSAKey} rsaKey The RSAKey private key with the public key values.
     * @return {Blob} The SubjectPublicKeyInfo DER.
     */
    static encodePublicKeyFromRSAKey(rsaKey: RSAKey): Blob;

    /**
     * Convert a BigInteger to a Buffer.
     * @param {BigInteger} bigInteger The BigInteger.
     * @return {Buffer} The Buffer.
     */
    static bigIntegerToBuffer(bigInteger: BigInteger): Buffer;

    static RSA_ENCRYPTION_OID: string;
    static EC_ENCRYPTION_OID: string;
}