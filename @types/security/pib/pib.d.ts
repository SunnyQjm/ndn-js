import {PibImpl} from "./pib-impl";
import {SyncPromise} from "../../util";
import {Name} from "../../name";
import {PibIdentity} from "./pib-identity";

export class Pib {
    /**
     * In general, a PIB (Public Information Base) stores the public portion of a
     * user's cryptography keys. The format and location of stored information is
     * indicated by the PIB locator. A PIB is designed to work with a TPM (Trusted
     * Platform Module) which stores private keys. There is a one-to-one association
     * between a PIB and a TPM, and therefore the TPM locator is recorded by the PIB
     * to enforce this association and prevent one from operating on mismatched PIB
     * and TPM.
     *
     * Information in the PIB is organized in a hierarchy of
     * Identity-Key-Certificate. At the top level, this Pib class provides access to
     * identities, and allows setting a default identity. Properties of an identity
     * (such as PibKey objects) can be accessed after obtaining a PibIdentity object.
     * (Likewise, CertificateV2 objects can be obtained from a PibKey object.)
     *
     * Note: A Pib instance is created and managed only by the KeyChain, and is
     * returned by the KeyChain getPib() method.
     *
     * Create a Pib instance. This constructor should only be called by KeyChain.
     *
     * @param {string} scheme The scheme for the PIB.
     * @param {string} location The location for the PIB.
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @constructor
     */
    constructor(scheme: string, location: string, pibImpl: PibImpl);

    /**
     * Get the scheme of the PIB locator.
     * @return {string} The scheme string.
     */
    getScheme(): string;

    /**
     * Get the PIB locator.
     * @return {string} The PIB locator.
     */
    getPibLocator(): string;

    /**
     * Set the corresponding TPM information to tpmLocator. If the tpmLocator is
     * different from the existing one, the PIB will be reset. Otherwise, nothing
     * will be changed.
     * @param {string} tpmLocator The TPM locator.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished.
     */
    setTpmLocatorPromise(tpmLocator: string, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the TPM Locator.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the TPM locator string,
     * or a promise rejected with Pib.Error if the TPM locator is empty.
     */
    getTpmLocatorPromise(useSync?: boolean): Promise<string> | SyncPromise;

    /**
     * Get the identity with name identityName.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibIdentity object,
     * or a promise rejected with Pib.Error if the identity does not exist.
     */
    getIdentityPromise(identityName: Name, useSync: boolean): Promise<PibIdentity> | SyncPromise;

    /**
     * Get the identity with name identityName.
     * @param {Name} identityName The name of the identity.
     * @param {function} onComplete (optional) This calls
     * onComplete(identity) with the PibIdentity object. If omitted, the return
     * value is described below. (Some database libraries only use a callback, so
     * onComplete is required to use these.)
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
     * @return {PibIdentity} If onComplete is omitted, return the PibIdentity object.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     * @throws Pib.Error if the identity does not exist. However, if onComplete and
     * onError are defined, then if there is an exception return undefined and call
     * onError(exception).
     */
    getIdentity(identityName: Name, onComplete?: (identity: PibIdentity) => any, onError?: (err: any) => any): PibIdentity;

    /**
     * Get the default identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the PibIdentity object
     * of the default identity, or a promise rejected with Pib.Error for no default
     * identity.
     */
    getDefaultIdentityPromise(useSync?: boolean): Promise<PibIdentity> | SyncPromise;

    /**
     * Get the default identity.
     * @param {function} onComplete (optional) This calls
     * onComplete(identity) with the PibIdentity object. If omitted, the return
     * value is described below. (Some database libraries only use a callback, so
     * onComplete is required to use these.)
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
     * @return {PibIdentity} If onComplete is omitted, return the PibIdentity object.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     * @throws Pib.Error for no default identity. However, if onComplete and onError
     * are defined, then if there is an exception return undefined and call
     * onError(exception).
     */
    getDefaultIdentity(onComplete?: (identity: PibIdentity) => any, onError?: (err: any) => any): PibIdentity;
}

export namespace Pib {
    class Error {
        /**
         * Create a Pib.Error which represents a semantic error in PIB processing.
         * Call with: throw new Pib.Error(new Error("message")).
         * @constructor
         * @param {Error} error The exception created with new Error.
         */
        constructor(error: Error);
    }
}