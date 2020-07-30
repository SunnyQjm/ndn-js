import {Name} from "../../../name";
import {PibImpl} from "../pib-impl";
import {SyncPromise} from "../../../util";
import {PibKey} from "../pib-key";

export class PibIdentityImpl {
    /**
     * A PibIdentityImpl provides the backend implementation for PibIdentity. A
     * PibIdentity has only one backend instance, but may have multiple frontend
     * handles. Each frontend handle is associated with the only one backend
     * PibIdentityImpl.
     *
     * You should not call this private constructor. Instead, use
     * PibIdentityImpl.makePromise().
     *
     * @constructor
     */
    constructor();

    /**
     * Create a PibIdentityImpl with identityName.
     * This method that returns a Promise is needed instead of a normal constructor
     * since it uses asynchronous PibImpl methods to initialize the object.
     *
     * @param {Name} identityName The name of the identity, which is copied.
     * @param {PibImpl} pibImpl: The Pib backend implementation.
     * @param {boolean} needInit If true and the identity does not exist in the
     * pibImpl back end, then create it (and If no default identity has been set,
     * identityName becomes the default). If false, then throw Pib.Error if the
     * identity does not exist in the pibImpl back end.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @param {Promise|SyncPromise} A promise which returns the new PibIdentityImpl,
     * or a promise which is rejected with Pib.Error if the identity does not exist
     * in the pibImpl back end and needInit is false.
     */
    static makePromise(identityName: Name, pibImpl: PibImpl, needInit: boolean, useSync?: boolean): Promise<PibIdentityImpl> | SyncPromise;

    /**
     * Get the name of the identity.
     * @return {Name} The name of the identity. You must not change the Name object.
     * If you need to change it then make a copy.
     */
    getName(): Name;

    /**
     * Add the key. If a key with the same name already exists, overwrite the key.
     * If no default key for the identity has been set, then set the added key as
     * default for the identity.
     * @param {Buffer} key The public key bits. This copies the buffer.
     * @param {Name} keyName The name of the key. This copies the name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibKey object.
     */
    addKeyPromise(key: Buffer, keyName: Name, useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * Remove the key with keyName and its related certificates. If the key does not
     * exist, do nothing.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished.
     */
    removeKeyPromise(keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the key with name keyName.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibKey object, or a
     * promise rejected with Pib.Error if the key does not exist.
     */
    getKeyPromise(keyName: Name, useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * setDefaultKey has two forms:
     * setDefaultKey(keyName, useSync) - Set the key with name keyName as the
     * default key of the identity.
     * setDefaultKey(key, keyName, useSync) - Add a key with name keyName and set it
     * as the default key of the identity.
     * @param {Buffer} key The buffer of encoded key bytes. (This is only used when
     * calling setDefaultKey(key, keyName). )
     * @param {Name} keyName The name of the key. This copies the name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {SyncPromise} A promise which returns the PibKey object of the
     * default key, or a promise rejected with Error the name of the key does not
     * match the identity name, or a promise rejected with Pib.Error if calling
     * setDefaultKey(keyName) and the key does not exist, or if calling
     * setDefaultKey(key, keyName) and a key with the same name already exists.
     */
    setDefaultKeyPromise(keyOrKeyName: Buffer | Name, arg2?: Name | boolean, arg3?: boolean): SyncPromise;

    /**
     * Get the default key of this Identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {SyncPromise} A promise which returns the default PibKey, or a
     * promise rejected with Pib.Error if the default key has not been set.
     */
    getDefaultKeyPromise(useSync?: boolean): SyncPromise;
}