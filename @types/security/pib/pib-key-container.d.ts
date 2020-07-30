import {Name} from "../../name";
import {PibImpl} from "./pib-impl";
import {SyncPromise} from "../../util";
import {PibKey} from "./pib-key";

export class PibKeyContainer {
    /**
     * A PibKeyContainer is used to search/enumerate the keys of an identity. (A
     * PibKeyContainer object can only be created by PibIdentity.)
     *
     * You should not call this private constructor. Instead, use
     * PibKeyContainer.makePromise().
     *
     * @param {Name} identityName The name of the identity, which is copied.
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @param {Array<Name>} keyNames The set of key names as an array of Name, as
     * returned by getKeysOfIdentityPromise.
     * @constructor
     */
    constructor(identityName: Name, pibImpl: PibImpl, keyNames: Name[]);

    /**
     * Create a PibKeyContainer for an identity with identityName.
     * This method that returns a Promise is needed instead of a normal constructor
     * since it uses asynchronous PibImpl methods to initialize the object.
     * This method should only be called by PibIdentityImpl.
     *
     * @param {Name} identityName The name of the identity, which is copied.
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @param {Promise|SyncPromise} A promise which returns the new
     * PibKeyContainer.
     */
    static makePromise(identityName: Name, pibImpl: PibImpl, useSync?: boolean): Promise<PibKeyContainer> | SyncPromise;

    /**
     * Get the number of keys in the container.
     * @return {number} The number of keys.
     */
    size(): number;

    /**
     * Add a key with name keyName into the container. If a key with the same name
     * already exists, this replaces it.
     * @param {Buffer} key The buffer of encoded key bytes.
     * @param {Name} keyName The name of the key, which is copied.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibKey object, or a
     * promise rejected with Error if the name of the key does not match the
     * identity name.
     */
    addPromise(key: Buffer, keyName: Name, useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * Remove the key with name keyName from the container, and its related
     * certificates. If the key does not exist, do nothing.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with Error if keyName does not match the identity name.
     */
    removePromise(keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the key with name keyName from the container.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibKey object, or a
     * promise rejected with Error if keyName does not match the identity name, or a
     * promise rejected with Pib.Error if the key does not exist.
     */
    getPromise(keyName: Name, useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * Get the names of all the keys in the container.
     * @return {Array<Name>} A new list of Name.
     */
    getKeyNames(): Name[];
}