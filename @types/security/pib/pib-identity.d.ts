import {PibIdentityImpl} from "./detail/pib-identity-impl";
import {Name} from "../../name";
import {PibKey} from "./pib-key";
import {SyncPromise} from "../../util";

export class PibIdentity {
    /**
     * A PibIdentity is at the top level in PIB's Identity-Key-Certificate hierarchy.
     * An identity has a Name, and contains zero or more keys, at most one of which
     * is set as the default key of this identity. Properties of a key can be
     * accessed after obtaining a PibKey object.
     *
     * Create a PibIdentity which uses the impl backend implementation. This
     * constructor should only be called by PibIdentityContainer.
     *
     * @param {PibIdentityImpl} impl The PibIdentityImpl.
     * @constructor
     */
    constructor(impl: PibIdentityImpl);

    /**
     * Get the name of the identity.
     * @return {Name} The name of the identity. You must not change the Name object.
     * If you need to change it then make a copy.
     * @throws Error if the backend implementation instance is invalid.
     */
    getName(): Name;

    /**
     * Get the key with name keyName.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibKey object, or a
     * promise rejected with Pib.Error if the key does not exist, or a promise
     * rejected with Error if the backend implementation instance is invalid.
     */
    getKeyPromise(keyName: Name, useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * Get the key with name keyName.
     * @param {Name} keyName The name of the key.
     * @param {function} onComplete (optional) This calls onComplete(key) with the
     * PibKey object. If omitted, the return value is described below. (Some
     * database libraries only use a callback, so onComplete is required to use
     * these.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @return {PibKey} If onComplete is omitted, return the PibKey object.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     * @throws Pib.Error if the key does not exist, or Error if the backend
     * implementation instance is invalid. However, if onComplete and onError are
     * defined, then if there is an exception return undefined and call
     * onError(exception).
     */
    getKey(keyName: Name, onComplete?: (key: PibKey) => any, onError?: (err: any) => any): PibKey;

    /**
     * Get the default key of this Identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibKey object of
     * the default key, or a promise rejected with Pib.Error if the default key has
     * not been set, or a promise rejected with Error if the backend implementation
     * instance is invalid.
     */
    getDefaultKeyPromise(useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * Get the default key of this Identity.
     * @param {function} onComplete (optional) This calls onComplete(key) with the
     * PibKey object of the default key. If omitted, the return value is described
     * below. (Some database libraries only use a callback, so onComplete is
     * required to use these.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @return {PibKey} If onComplete is omitted, return the PibKey object of the
     * default key. Otherwise, if onComplete is supplied then return undefined and
     * use onComplete as described above.
     * @throws Pib.Error if the default key has not been set, or Error if the
     * backend implementation instance is invalid. However, if onComplete and
     * onError are defined, then if there is an exception return undefined and call
     * onError(exception).
     */
    getDefaultKey(onComplete?: (key: PibKey) => any, onError?: (err: any) => any): PibKey;


}