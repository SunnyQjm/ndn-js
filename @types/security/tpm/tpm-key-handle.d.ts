import {Blob, SyncPromise} from "../../util";
import {Name} from "../../name";

export class TpmKeyHandle {
    /**
     * TpmKeyHandle is an abstract base class for a TPM key handle, which provides
     * an interface to perform cryptographic operations with a key in the TPM.
     * @constructor
     */
    constructor();

    /**
     * Compute a digital signature from the byte buffer using this key with
     * digestAlgorithm.
     * @param {number} digestAlgorithm The digest algorithm as an int from the
     * DigestAlgorithm enum.
     * @param {Buffer} data The input byte buffer.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the signature Blob (or
     * an isNull Blob for an unrecognized digestAlgorithm), or a promise rejected
     * with TpmBackEnd.Error for an error in signing.
     */
    signPromise(digestAlgorithm: number, data: Buffer, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Return the plain text which is decrypted from cipherText using this key.
     * @param {Buffer} cipherText The cipher text byte buffer.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the decrypted data Blob,
     * or a promise rejected with TpmPrivateKey.Error for error decrypting.
     */
    decryptPromise(cipherText: Buffer, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Get the encoded public key derived from this key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Blob} The public key encoding Blob.
     */
    derivePublicKey(useSync?: boolean): Blob;

    setKeyName(keyName: Name);

    getKeyName(): Name;


}