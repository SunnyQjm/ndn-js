import {PibImpl} from "./pib-impl";
import {Name} from "../../name";
import {SyncPromise} from "../../util";
import {PibIdentity} from "./pib-identity";

export class PibIdentityContainer {
    /**
     * A PibIdentityContainer is used to search/enumerate the identities in a PIB.
     * (A PibIdentityContainer object can only be created by the Pib class.)
     *
     * You should not call this private constructor. Instead, use
     * PibIdentityContainer.makePromise().
     *
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @param {Array<Name>} identityNames The set of identity names as an array of
     * Name, as returned by getIdentitiesPromise.
     * @constructor
     */
    constructor(pibImpl: PibImpl, identityNames: Name[]);

    /**
     * Create a PibIdentityContainer using to use the pibImpl backend implementation.
     * This method that returns a Promise is needed instead of a normal constructor
     * since it uses asynchronous PibImpl methods to initialize the object.
     * This method should only be called by Pib.
     *
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @param {Promise|SyncPromise} A promise which returns the new
     * PibIdentityContainer.
     */
    static makePromise(pibImpl: PibImpl, useSync?: boolean): Promise<PibIdentityContainer> | SyncPromise;

    /**
     * Get the number of identities in the container.
     * @return {number} The number of identities.
     */
    size(): number;

    /**
     * Add an identity with name identityName into the container. Create the
     * identity if it does not exist.
     * @param {Name} identityName The name of the identity, which is copied.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibIdentity object.
     */
    addPromise(identityName: Name, useSync?: boolean): Promise<PibIdentity> | SyncPromise;

    /**
     * Remove the identity with name identityName from the container, and its
     * related keys and certificates. If the default identity is being removed, no
     * default identity will be selected. If the identity does not exist, do nothing.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished.
     */
    removePromise(identityName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the identity with name identityName from the container.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {SyncPromise} A promise which returns the PibIdentity object, or a
     * promise rejected with Pib.Error if the identity does not exist.
     */
    getPromise(identityName: Name, useSync?: boolean): SyncPromise;

    /**
     * Reset the state of the container. This method removes all loaded identities
     * and retrieves identity names from the PIB implementation.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {SyncPromise} A promise which fulfills when finished.
     */
    resetPromise(useSync?: boolean): SyncPromise;
}