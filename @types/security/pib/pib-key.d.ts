import {PibKeyImpl} from "./detail/pib-key-impl";
import {Name} from "../../name";
import {Blob, SyncPromise} from "../../util";
import {CertificateV2} from "../v2/certificate-v2";

export class PibKey {
    /**
     * A PibKey provides access to a key at the second level in the PIB's
     * Identity-Key-Certificate hierarchy. A PibKey object has a Name (identity +
     * "KEY" + keyId), and contains one or more CertificateV2 objects, one of which
     * is set as the default certificate of this key. A certificate can be directly
     * accessed by getting a CertificateV2 object.
     *
     * Create a PibKey which uses the impl backend implementation. This constructor
     * should only be called by PibKeyContainer.
     *
     * @param {PibKeyImpl} impl An object of a subclass of PibKeyImpl.
     * @constructor
     */
    constructor(impl: PibKeyImpl);

    /**
     * Get the key name.
     * @return {Name} The key name. You must not modify the Name object. If you need
     * to modify it, make a copy.
     * @throws Error if the backend implementation instance is invalid.
     */
    getName(): Name;

    /**
     * Get the name of the identity this key belongs to.
     * @return {Name} The name of the identity. You must not modify the Key object.
     * If you need to modify it, make a copy.
     * @throws Error if the backend implementation instance is invalid.
     */
    getIdentityName(): Name;

    /**
     * Get the key type.
     * @return {number} The key type as an int from the KeyType enum.
     * @throws Error if the backend implementation instance is invalid.
     */
    getKeyType(): number;

    /**
     * Get the public key encoding.
     * @return {Blob} The public key encoding.
     * @throws Error if the backend implementation instance is invalid.
     */
    getPublicKey(): Blob;

    /**
     * Get the certificate with name certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a copy of the
     * CertificateV2, or a promise rejected with Error if certificateName does not
     * match the key name (or if the backend implementation instance is invalid), or
     * a promise rejected with Pib.Error if the certificate does not exist.
     */
    getCertificatePromise(certificateName: Name, useSync?: boolean): Promise<CertificateV2> | SyncPromise;

    /**
     * Get the certificate with name certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @param {function} onComplete (optional) This calls
     * onComplete(certificate) with a copy of the CertificateV2. If omitted, the
     * return value is described below. (Some database libraries only use a callback,
     * so onComplete is required to use these.)
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
     * @return {CertificateV2} If onComplete is omitted, return a copy of the
     * CertificateV2. Otherwise, if onComplete is supplied then return undefined and
     * use onComplete as described above.
     * @throws Error if certificateName does not match the key name (or if the
     * backend implementation instance is invalid), or Pib.Error if the certificate
     * does not exist. However, if onComplete and onError are defined, then if there
     * is an exception return undefined and call onError(exception).
     */
    getCertificate(certificateName: Name, onComplete?: (certificate: CertificateV2) => any, onError?: (err: any) => any): CertificateV2;

    /**
     * Get the default certificate for this Key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the default
     * CertificateV2, or a promise rejected with Error if the backend implementation
     * instance is invalid, or a promise rejected with Pib.Error if the default
     * certificate does not exist.
     */
    getDefaultCertificatePromise(useSync?: boolean): Promise<CertificateV2> | SyncPromise;

    /**
     * Get the default certificate for this Key.
     * @param {function} onComplete (optional) This calls
     * onComplete(certificate) with the default CertificateV2. If omitted, the
     * return value is described below. (Some database libraries only use a callback,
     * so onComplete is required to use these.)
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
     * @return {CertificateV2} If onComplete is omitted, return the default
     * CertificateV2. Otherwise, if onComplete is supplied then return undefined and
     * use onComplete as described above.
     * @throws Error if the backend implementation instance is invalid, Pib.Error if
     * the default certificate does not exist. However, if onComplete and onError
     * are defined, then if there is an exception return undefined and call
     * onError(exception).
     */
    getDefaultCertificate(onComplete?: (certificate: CertificateV2) => any, onError?: (err: any) => any): CertificateV2;

    /**
     * Construct a key name based on the appropriate naming conventions.
     * @param {Name} identityName The name of the identity.
     * @param {Name.Component} keyId The key ID name component.
     * @return {Name} The constructed name as a new Name.
     */
    static constructKeyName(identityName: Name, keyId: Name.Component): Name;

    /**
     * Check if keyName follows the naming conventions for a key name.
     * @param {Name} keyName The name of the key.
     * @return {boolean} True if keyName follows the naming conventions, otherwise
     * false.
     */
    static isValidKeyName(keyName: Name): boolean;

    /**
     * Extract the identity namespace from keyName.
     * @param {Name} keyName The name of the key.
     * @return {Name} The identity name as a new Name.
     */
    static extractIdentityFromKeyName(keyName: Name): Name;
}