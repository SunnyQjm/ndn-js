/**
 * The RsaAlgorithm class provides static methods to manipulate keys, encrypt
 * and decrypt using RSA.
 * @note This class is an experimental feature. The API may change.
 * @constructor
 */
import {RsaKeyParams} from "../../security/key-params";
import {DecryptKey} from "../decrypt-key";
import {Blob, SyncPromise} from "../../util";
import {EncryptKey} from "../encrypt-key";
import {EncryptParams} from "./encrypt-params";

export class RsaAlgorithm {
    /**
     * Generate a new random decrypt key for RSA based on the given params.
     * @param {RsaKeyParams} params The key params with the key size (in bits).
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the new DecryptKey
     * (containing a PKCS8-encoded private key).
     */
    generateKeyPromise(params: RsaKeyParams, useSync?: boolean): Promise<DecryptKey> | SyncPromise;

    /**
     * Generate a new random decrypt key for RSA based on the given params.
     * @param {RsaKeyParams} params The key params with the key size (in bits).
     * @return {DecryptKey} The new decrypt key (containing a PKCS8-encoded private
     * key).
     * @throws Error If generateKeyPromise doesn't return a SyncPromise which is
     * already fulfilled.
     */
    generateKey(params: RsaKeyParams): DecryptKey;

    /**
     * Derive a new encrypt key from the given decrypt key value.
     * @param {Blob} keyBits The key value of the decrypt key (PKCS8-encoded private
     * key).
     * @return {EncryptKey} The new encrypt key (DER-encoded public key).
     */
    deriveEncryptKey(keyBits: Blob): EncryptKey;

    /**
     * Decrypt the encryptedData using the keyBits according the encrypt params.
     * @param {Blob} keyBits The key value.
     * @param {Blob} encryptedData The data to decrypt.
     * @param {EncryptParams} params This decrypts according to
     * params.getAlgorithmType() and other params as needed such as
     * params.getInitialVector().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the decrypted Blob.
     */
    decryptPromise(keyBits: Blob, encryptedData: Blob, params: EncryptParams, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Decrypt the encryptedData using the keyBits according the encrypt params.
     * @param {Blob} keyBits The key value.
     * @param {Blob} encryptedData The data to decrypt.
     * @param {EncryptParams} params This decrypts according to
     * params.getAlgorithmType() and other params as needed such as
     * params.getInitialVector().
     * @return {Blob} The decrypted data.
     * @throws Error If decryptPromise doesn't return a SyncPromise which is
     * already fulfilled.
     */
    decrypt(keyBits: Blob, encryptedData: Blob, params: EncryptParams): Blob;

    /**
     * Encrypt the plainData using the keyBits according the encrypt params.
     * @param {Blob} keyBits The key value.
     * @param {Blob} plainData The data to encrypt.
     * @param {EncryptParams} params This encrypts according to
     * params.getAlgorithmType() and other params as needed such as
     * params.getInitialVector().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the encrypted Blob.
     */
    encryptPromise(keyBits: Blob, plainData: Blob, params: EncryptParams, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Encrypt the plainData using the keyBits according the encrypt params.
     * @param {Blob} keyBits The key value.
     * @param {Blob} plainData The data to encrypt.
     * @param {EncryptParams} params This encrypts according to
     * params.getAlgorithmType() and other params as needed such as
     * params.getInitialVector().
     * @return {Blob} The encrypted data.
     * @throws Error If encryptPromise doesn't return a SyncPromise which is
     * already fulfilled.
     */
    encrypt(keyBits: Blob, plainData: Blob, params: EncryptParams): Blob;

    /**
     * Decode the PKCS #8 private key, check that the algorithm is RSA, and return
     * the inner RSAPrivateKey DER.
     * @param {Blob} The DER-encoded PKCS #8 private key.
     * @param {Blob} The DER-encoded RSAPrivateKey.
     */
    getRsaPrivateKeyDer(pkcs8PrivateKeyDer: Blob): Blob;
}