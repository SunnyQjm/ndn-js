import {Name} from "../../name";
import {SyncPromise} from "../../util";
import {TpmKeyHandle} from "./tpm-key-handle";
import {KeyParams} from "../key-params";

export class TpmBackEnd {
    /**
     * TpmBackEnd is an abstract base class for a TPM backend implementation which
     * provides a TpmKeyHandle to the TPM front end. This class defines the
     * interface that an actual TPM backend implementation should provide, for
     * example TpmBackEndMemory.
     * @constructor
     */
    constructor();

    /**
     * Check if the key with name keyName exists in the TPM.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {SyncPromise} A promise which returns true if the key exists.
     */
    hasKeyPromise(keyName: Name, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Get the handle of the key with name keyName. Calling getKeyHandle multiple
     * times with the same keyName will return different TpmKeyHandle objects that
     * all refer to the same key.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a TpmKeyHandle of the
     * key, or returns null if the key does not exist.
     */
    getKeyHandlePromise(keyName: Name, useSync?: boolean): Promise<TpmKeyHandle> | SyncPromise;

    /**
     * Create a key for the identityName according to params.
     * @param {Name} identityName The name if the identity.
     * @param {KeyParams} params The KeyParams for creating the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a TpmKeyHandle of the
     * created key, or a promise rejected with TpmBackEnd.Error if the key cannot be
     * created.
     */
    createKeyPromise(identityName: Name, params: KeyParams, useSync?: boolean): Promise<TpmKeyHandle> | SyncPromise;

    /**
     * Delete the key with name keyName. If the key doesn't exist, do nothing.
     * Note: Continuing to use existing Key handles on a deleted key results in
     * undefined behavior.
     * @param {Name} keyName The name of the key to delete.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with TpmBackEnd.Error if the deletion fails.
     */
    deleteKeyPromise(keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the encoded private key with name keyName in PKCS #8 format, possibly
     * encrypted.
     * @param {Name} keyName The name of the key in the TPM.
     * @param {Buffer} password The password for encrypting the private key, which
     * should have characters in the range of 1 to 127. If the password is supplied,
     * use it to return a PKCS #8 EncryptedPrivateKeyInfo. If the password is null,
     * return an unencrypted PKCS #8 PrivateKeyInfo.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the encoded private key,
     * or a promise rejected with TpmBackEnd.Error if the key does not exist or if
     * the key cannot be exported, e.g., insufficient privileges.
     */
    exportKeyPromise(keyName: Name, password: Buffer, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Import an encoded private key with name keyName in PKCS #8 format, possibly
     * password-encrypted.
     * @param {Name} keyName The name of the key to use in the TPM.
     * @param {Buffer} pkcs8 The input byte buffer. If the password is supplied,
     * this is a PKCS #8 EncryptedPrivateKeyInfo. If the password is none, this is
     * an unencrypted PKCS #8 PrivateKeyInfo.
     * @param {Buffer} password The password for decrypting the private key, which
     * should have characters in the range of 1 to 127. If the password is supplied,
     * use it to decrypt the PKCS #8 EncryptedPrivateKeyInfo. If the password is
     * null, import an unencrypted PKCS #8 PrivateKeyInfo.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with TpmBackEnd.Error for an error importing the key.
     */
    importKeyPromise(keyName: Name, pkcs8: Buffer, password: Buffer, useSync?: boolean): Promise<any> | SyncPromise;

    // TODO: isTerminalMode
    // TODO: setTerminalMode
    // TODO: isTpmLocked
    // TODO: unlockTpm

    /**
     * Set the key name in keyHandle according to identityName and params.
     * @param {TpmKeyHandle} keyHandle
     * @param {Name} identityName
     * @param {KeyParams} params
     */
    static setKeyName(keyHandle: TpmKeyHandle, identityName: Name, params: KeyParams);
}

export namespace TpmBackEnd {
    class TpmBackEndError {
        constructor(error: any);
    }
    type Error = TpmBackEndError;
}