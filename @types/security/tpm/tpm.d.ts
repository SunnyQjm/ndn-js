import {TpmBackEnd} from "./tpm-back-end";
import {Name} from "../../name";
import {Blob, SyncPromise} from "../../util";

export class Tpm {
    /**
     * The TPM (Trusted Platform Module) stores the private portion of a user's
     * cryptography keys. The format and location of stored information is indicated
     * by the TPM locator. The TPM is designed to work with a PIB (Public
     * Information Base) which stores public keys and related information such as
     * certificates.
     *
     * The TPM also provides functionalities of cryptographic transformation, such
     * as signing and decryption.
     *
     * A TPM consists of a unified front-end interface and a backend implementation.
     * The front-end caches the handles of private keys which are provided by the
     * backend implementation.
     *
     * Note: A Tpm instance is created and managed only by the KeyChain. It is
     * returned by the KeyChain getTpm() method, through which it is possible to
     * check for the existence of private keys, get public keys for the private
     * keys, sign, and decrypt the supplied buffers using managed private keys.
     *
     * Create a new TPM instance with the specified location. This constructor
     * should only be called by KeyChain.
     *
     * @param {string} scheme The scheme for the TPM.
     * @param {string} location The location for the TPM.
     * @param {TpmBackEnd} backEnd The TPM back-end implementation.
     * @constructor
     */
    constructor(scheme: string, location: string, backEnd: TpmBackEnd);

    getTpmLocator(): string;

    /**
     * Check if the key with name keyName exists in the TPM.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if the key exists.
     */
    hasKeyPromise(keyName: Name, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Get the public portion of an asymmetric key pair with name keyName.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the encoded public key
     * Blob (or an isNull Blob if the key does not exist).
     */
    getPublicKeyPromise(keyName: Name, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Compute a digital signature from the byte buffer using the key with name
     * keyName.
     * @param {Buffer} data The input byte buffer.
     * @param {Name} keyName The name of the key.
     * @param {number} digestAlgorithm The digest algorithm as an int from the
     * DigestAlgorithm enum.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the signature Blob (or
     * an isNull Blob if the key does not exist), or a promise rejected
     * with TpmBackEnd.Error for an error in signing.
     */
    signPromise(data: Buffer, keyName: Name, digestAlgorithm: number, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Return the plain text which is decrypted from cipherText using the key with
     * name keyName.
     * @param {Buffer} cipherText The cipher text byte buffer.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the decrypted data Blob
     * (or an isNull Blob if the key does not exist).
     */
    decryptPromise(cipherText: Buffer, keyName: Name, useSync?: boolean): Promise<Blob> | SyncPromise;

    // TODO: isTerminalModePromise
    // TODO: setTerminalModePromise
    // TODO: isTpmLockedPromise
    // TODO: unlockTpmPromise
}

export namespace Tpm {
    class TpmError {
        constructor(error: any);
    }

    type Error = TpmError;
}