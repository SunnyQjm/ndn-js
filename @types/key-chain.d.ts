import {Data} from "./data";
import {Interest} from "./interest";
import {Name} from "./name";
import {SyncPromise, Blob} from './util';
import {Signature} from "./signature";
import {WireFormat} from "./encoding/wire-format";
import {CertificateV2} from "./security/v2/certificate-v2";
import {PibIdentity} from "./security/pib/pib-identity";
import {PibKey} from "./security/pib/pib-key";
import {KeyParams} from "./security/key-params";
import {SigningInfo} from "./security/signing-info";

export class KeyChain {
    constructor();
    constructor(pibLocator: string, tpmLocator: string, allowReset?: boolean);

    static getDefaultKeyParams(): KeyParams;

    getPib(): Pib;

    getTpm(): Tpm;

    /**
     * Get the flag set by the constructor if this is a security v1 or v2 KeyChain.
     * @return (boolean} True if this is a security v1 KeyChain, false if this is a
     * security v2 KeyChain.
     */
    getIsSecurityV1(): Boolean;

    /**
     * Create a security V2 identity for identityName. This method will check if the
     * identity exists in PIB and whether the identity has a default key and default
     * certificate. If the identity does not exist, this method will create the
     * identity in PIB. If the identity's default key does not exist, this method
     * will create a key pair and set it as the identity's default key. If the key's
     * default certificate is missing, this method will create a self-signed
     * certificate for the key. If identityName did not exist and no default
     * identity was selected before, the created identity will be set as the default
     * identity.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params (optional) The key parameters if a key needs to be
     * generated for the identity. If omitted, use getDefaultKeyParams().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the created PibIdentity
     * instance.
     */
    createIdentityV2Promise(identityName: Name, params?: KeyParams, useSync?: Boolean): Promise<PibIdentity> | SyncPromise;

    /**
     * Create a security V2 identity for identityName. This method will check if the
     * identity exists in PIB and whether the identity has a default key and default
     * certificate. If the identity does not exist, this method will create the
     * identity in PIB. If the identity's default key does not exist, this method
     * will create a key pair and set it as the identity's default key. If the key's
     * default certificate is missing, this method will create a self-signed
     * certificate for the key. If identityName did not exist and no default
     * identity was selected before, the created identity will be set as the default
     * identity.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params (optional) The key parameters if a key needs to be
     * generated for the identity. If omitted, use getDefaultKeyParams().
     * @param {function} onComplete (optional) This calls
     * onComplete(identity) with the created PibIdentity instance. If omitted, the
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
     * @return {PibIdentity} If onComplete is omitted, return the created
     * PibIdentity instance. Otherwise, if onComplete is supplied then return
     * undefined and use onComplete as described above.
     */
    createIdentityV2(identityName: Name, params?: KeyParams): PibIdentity;
    createIdentityV2(identityName: Name, onComplete: (identity: PibIdentity) => any, onError?: (err: any) => any): void;
    createIdentityV2(identityName: Name, params: KeyParams, onComplete: (identity: PibIdentity) => any, onError?: (err: any) => any): void;

    /**
     * This method has two forms:
     * deleteIdentity(identity, useSync) - Delete the PibIdentity identity. After this
     * operation, the identity is invalid.
     * deleteIdentity(identityName, useSync) - Delete the identity from the public and
     * private key storage. If the identity to be deleted is the current default s
     * system default, the method will not delete the identity and will return
     * immediately.
     * @param {PibIdentity | Name} identity The identity to delete | The name of the identity to delete.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete.
     */
    deleteIdentityPromise(identity: PibIdentity | Name, useSync: boolean): Promise<any> | SyncPromise;

    /**
     * This method has two forms:
     * deleteIdentity(identity, onComplete, onError) - Delete the PibIdentity
     * identity (optionally using onComplete and onError callbacks). After this
     * operation, the identity is invalid.
     * deleteIdentity(identityName, onComplete, onError) - Delete the identity from
     * the public and private key storage (optionally using onComplete and onError
     * callbacks). If the identity to be deleted is the current default system
     * default, the method will not delete the identity and will return immediately.
     * @param {PibIdentity | Name} identity The identity to delete | The name of the identity to delete.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     */
    deleteIdentity(identity: PibIdentity | Name, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Set the identity as the default identity.
     * @param {PibIdentity} identity The identity to make the default.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete.
     */
    setDefaultIdentityPromise(identity: PibIdentity, useSync?: boolean): Promise<PibIdentity> | SyncPromise;

    /**
     * Set the identity as the default identity.
     * @param {PibIdentity} identity The identity to make the default.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     */
    setDefaultIdentity(identity: PibIdentity, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Create a key for the identity according to params. If the identity had no
     * default key selected, the created key will be set as the default for this
     * identity. This method will also create a self-signed certificate for the
     * created key.
     * @param {PibIdentity} identity A valid PibIdentity object.
     * @param {KeyParams} params (optional) The key parameters if a key needs to be
     * generated for the identity. If omitted, use getDefaultKeyParams().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the new PibKey.
     */
    createKeyPromise(identity: PibIdentity, params?: KeyParams, useSync?: boolean): Promise<PibKey> | SyncPromise;

    /**
     * Create a key for the identity according to params. If the identity had no
     * default key selected, the created key will be set as the default for this
     * identity. This method will also create a self-signed certificate for the
     * created key.
     * @param {PibIdentity} identity A valid PibIdentity object.
     * @param {KeyParams} params (optional) The key parameters if a key needs to be
     * generated for the identity. If omitted, use getDefaultKeyParams().
     * @param {function} onComplete (optional) This calls onComplete(key) with the
     * new PibKey. If omitted, the return value is described below. (Some database
     * libraries only use a callback, so onComplete is required to use these.)
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
     * @return {PibKey} If onComplete is omitted, return the new PibKey. Otherwise,
     * if onComplete is supplied then return undefined and use onComplete as
     * described above.
     */
    createKey(identity: PibIdentity, params?: KeyParams): PibKey;
    createKey(identity: PibIdentity, onComplete: (key: PibKey) => any, onError?: (err: any) => any): void;
    createKey(identity: PibIdentity, params: KeyParams, onComplete: (key: PibKey) => any, onError?: (err: any) => any): void;

    /**
     * Delete the given key of the given identity. The key becomes invalid.
     * @param {PibIdentity} identity A valid PibIdentity object.
     * @param {PibKey} key The key to delete.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete, or a promise rejected with Error if the key does not belong to the
     * identity.
     */
    deleteKeyPromise(identity: PibIdentity, key: PibKey, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete the given key of the given identity. The key becomes invalid.
     * @param {PibIdentity} identity A valid PibIdentity object.
     * @param {PibKey} key The key to delete.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     * @throws Error if the key does not belong to the identity. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    deleteKey(identity: PibIdentity, key: PibKey, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Set the key as the default key of identity.
     * @param {type} identity A valid PibIdentity object.
     * @param {type} key The key to become the default.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete, or a promise rejected with Error if the key does not belong to the
     * identity.
     */
    setDefaultKeyPromise(identity: PibIdentity, key: PibKey, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Set the key as the default key of identity.
     * @param {type} identity A valid PibIdentity object.
     * @param {type} key The key to become the default.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     * @throws Error if the key does not belong to the identity. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    setDefaultKey(identity: PibIdentity, key: PibKey, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Add a certificate for the key. If the key had no default certificate
     * selected, the added certificate will be set as the default certificate for
     * this key.
     * @param {PibKey} key A valid PibKey object.
     * @param {CertificateV2} certificate The certificate to add. This copies the
     * object.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete, or a promise rejected with Error if the key does not match the
     * certificate.
     */
    addCertificatePromise(key: PibKey, certificate: CertificateV2, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Add a certificate for the key. If the key had no default certificate
     * selected, the added certificate will be set as the default certificate for
     * this key.
     * @param {PibKey} key A valid PibKey object.
     * @param {CertificateV2} certificate The certificate to add. This copies the
     * object.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     * @throws Error if the key does not match the certificate. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    addCertificate(key: PibKey, certificate: CertificateV2, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Delete the certificate with the given name from the given key. If the
     * certificate does not exist, this does nothing.
     * @param {PibKey} key A valid PibKey object.
     * @param {Name} certificateName The name of the certificate to delete.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete, or a promise rejected with Error if certificateName does not follow
     * certificate naming conventions.
     */
    deleteCertificatePromise(key: PibKey, certificateName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete the certificate with the given name from the given key. If the
     * certificate does not exist, this does nothing.
     * @param {PibKey} key A valid PibKey object.
     * @param {Name} certificateName The name of the certificate to delete.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     * @throws Error if certificateName does not follow certificate naming
     * conventions. However, if onComplete and onError are defined, then if there is
     * an exception return undefined and call onError(exception).
     */
    deleteCertificate(key: PibKey, certificateName: Name, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Set the certificate as the default certificate of the key. The certificate
     * will be added to the key, potentially overriding an existing certificate if
     * it has the same name (without considering implicit digest).
     * @param {PibKey} key A valid PibKey object.
     * @param {CertificateV2} certificate The certificate to become the default.
     * This copies the object.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the operation is
     * complete.
     */
    setDefaultCertificatePromise(key: PibKey, certificate: CertificateV2, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Set the certificate as the default certificate of the key. The certificate
     * will be added to the key, potentially overriding an existing certificate if
     * it has the same name (without considering implicit digest).
     * @param {PibKey} key A valid PibKey object.
     * @param {CertificateV2} certificate The certificate to become the default.
     * This copies the object.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
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
     */
    setDefaultCertificate(key: PibKey, certificate: CertificateV2, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Sign the target. If it is a Data or Interest object, set its signature. If it
     * is a Buffer, produce a Signature object.
     * @param {Data|Interest|Buffer} target If this is a Data object, wire encode
     * for signing, replace its Signature object based on the type of key and other
     * info in the SigningInfo params or default identity, and update the
     * wireEncoding. If this is an Interest object, wire encode for signing, append
     * a SignatureInfo to the Interest name, sign the name components and append a
     * final name component with the signature bits. If it is a buffer, sign it and
     * return a Signature object.
     * @param {SigningInfo|Name} paramsOrCertificateName (optional) If a SigningInfo,
     * it is the signing parameters. If a Name, it is the certificate name of the
     * key to use for signing. If omitted and this is a security v1 KeyChain then
     * use the IdentityManager to get the default identity. Otherwise, use the PIB
     * to get the default key of the default identity.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the target (if target is
     * Data or Interest), or returns the generated Signature object (if target is a
     * Buffer).
     */
    signPromise(target: Data | Interest | Buffer, paramsOrCertificateName: SigningInfo | Name, wireFormat?: WireFormat, useSync?: boolean): Promise<Interest> | SyncPromise;

    /**
     * Sign the target. If it is a Data or Interest object, set its signature. If it
     * is a Buffer, produce a Signature object.
     * for signing, replace its Signature object based on the type of key and other
     * info in the SigningInfo params or default identity, and update the
     * wireEncoding. If this is an Interest object, wire encode for signing, append
     * a SignatureInfo to the Interest name, sign the name components and append a
     * final name component with the signature bits. If it is a buffer, sign it and
     * return a Signature object.
     * it is the signing parameters. If a Name, it is the certificate name of the
     * key to use for signing. If omitted and this is a security v1 KeyChain then
     * use the IdentityManager to get the default identity. Otherwise, use the PIB
     * to get the default key of the default identity.
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @param interest
     * @param params
     * @param {function} onComplete (optional) If target is a Data object, this calls
     * onComplete(data) with the supplied Data object which has been modified to set
     * its signature. If target is an Interest object, this calls
     * onComplete(interest) with the supplied Interest object which has been
     * modified to set its signature. If target is a Buffer, this calls
     * onComplete(signature) where signature is the produced Signature object. If
     * omitted, the return value is described below. (Some crypto libraries only use
     * a callback, so onComplete is required to use these.)
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
     * @return {Signature} If onComplete is omitted, return the generated Signature
     * object (if target is a Buffer) or the target (if target is Data or Interest).
     * Otherwise, if onComplete is supplied then return undefined and use onComplete as
     * described above.
     */
    sign(interest: Interest, params: SigningInfo, onComplete?: (interest: Interest) => any, onError?: (err: any) => any): Signature;
    sign(data: Data, params: SigningInfo, onComplete?: (data: Data) => any, onError?: (err: any) => any): Signature;

    /**
     * Generate a self-signed certificate for the public key and add it to the PIB.
     * This creates the certificate name from the key name by appending "self" and a
     * version based on the current time. If no default certificate for the key has
     * been set, then set the certificate as the default for the key.
     * @param {PibKey} key The PibKey with the key name and public key.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the certificate. If omitted, use WireFormat getDefaultWireFormat().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the new CertificateV2.
     */
    selfSignPromise(key: PibKey, wireFormat?: WireFormat, useSync?: boolean): Promise<CertificateV2> | SyncPromise;

    /**
     * Generate a self-signed certificate for the public key and add it to the PIB.
     * This creates the certificate name from the key name by appending "self" and a
     * version based on the current time. If no default certificate for the key has
     * been set, then set the certificate as the default for the key.
     * @param {PibKey} key The PibKey with the key name and public key.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the certificate. If omitted, use WireFormat getDefaultWireFormat().
     * @param {function} onComplete (optional) This calls
     * onComplete(certificate) with the new CertificateV2. If omitted, the return
     * value is described below. (Some crypto libraries only use a callback, so
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
     * @return {CertificateV2} If onComplete is omitted, return the new certificate.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     */
    selfSign(key: PibKey, wireFormat?: WireFormat, onComplete?: (certificateV2: CertificateV2) => any, onError?: (err: any) => any): CertificateV2;

    // Import and export

    /**
     * Export a certificate and its corresponding private key in a SafeBag.
     * @param {CertificateV2} certificate The certificate to export. This gets the
     * key from the TPM using certificate.getKeyName().
     * @param {Buffer} password (optional) The password for encrypting the private
     * key, which should have characters in the range of 1 to 127. If the password
     * is supplied, use it to put a PKCS #8 EncryptedPrivateKeyInfo in the SafeBag.
     * If the password is null, put an unencrypted PKCS #8 PrivateKeyInfo in the
     * SafeBag.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a SafeBag carrying the
     * certificate and private key, or a promise rejected with KeyChain.Error if
     * certificate.getKeyName() key does not exist, if the password is null and the
     * TPM does not support exporting an unencrypted private key, or for other
     * errors exporting the private key.
     */
    exportSafeBagPromise(certificate: CertificateV2, password: Buffer, useSync?: boolean): Promise<SafeBag> | SyncPromise;

    /**
     * Export a certificate and its corresponding private key in a SafeBag.
     * @param {CertificateV2} certificate The certificate to export. This gets the
     * key from the TPM using certificate.getKeyName().
     * @param {Buffer} password (optional) The password for encrypting the private
     * key, which should have characters in the range of 1 to 127. If the password
     * is supplied, use it to put a PKCS #8 EncryptedPrivateKeyInfo in the SafeBag.
     * If the password is null, put an unencrypted PKCS #8 PrivateKeyInfo in the
     * SafeBag.
     * @param {function} onComplete (optional) This calls onComplete(safeBag) with a
     * SafeBag carrying the certificate and private key. If omitted, the return
     * value is described below. (Some crypto libraries only use a callback, so
     * onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @return {SafeBag} If onComplete is omitted, return a SafeBag carrying the
     * certificate and private key. Otherwise, if onComplete is supplied then return
     * undefined and use onComplete as described above.
     */
    exportSafeBag(certificate: CertificateV2, password: Buffer, onComplete?: (safeBag: SafeBag) => any, onError?: (err: any) => any): SafeBag;

    /**
     * Import a certificate and its corresponding private key encapsulated in a
     * SafeBag. If the certificate and key are imported properly, the default
     * setting will be updated as if a new key and certificate is added into this
     * KeyChain.
     * @param {SafeBag} safeBag The SafeBag containing the certificate and private
     * key. This copies the values from the SafeBag.
     * @param {Buffer} password (optional) The password for decrypting the private
     * key, which should have characters in the range of 1 to 127. If the password
     * is supplied, use it to decrypt the PKCS #8 EncryptedPrivateKeyInfo. If the
     * password is omitted or null, import an unencrypted PKCS #8 PrivateKeyInfo.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished.
     */
    importSafeBagPromise(safeBag: SafeBag, password?: Buffer, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Import a certificate and its corresponding private key encapsulated in a
     * SafeBag. If the certificate and key are imported properly, the default
     * setting will be updated as if a new key and certificate is added into this
     * KeyChain.
     * @param {SafeBag} safeBag The SafeBag containing the certificate and private
     * key. This copies the values from the SafeBag.
     * @param {Buffer} password (optional) The password for decrypting the private
     * key, which should have characters in the range of 1 to 127. If the password
     * is supplied, use it to decrypt the PKCS #8 EncryptedPrivateKeyInfo. If the
     * password is omitted or null, import an unencrypted PKCS #8 PrivateKeyInfo.
     * @param {function} onComplete (optional) This calls onComplete() when finished.
     * If omitted, just return when finished. (Some crypto libraries only use a
     * callback, so onComplete is required to use these.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     */
    importSafeBag(safeBag: SafeBag, password?: Buffer, onComplete?: () => any, onError?: (err: any) => any): void;


    // PIB & TPM backend registry

    /**
     * Add to the PIB factories map where scheme is the key and makePibImpl is the
     * value. If your application has its own PIB implementations, this must be
     * called before creating a KeyChain instance which uses your PIB scheme.
     * @param {string} scheme The PIB scheme.
     * @param {function} makePibImpl A callback which takes the PIB location and
     * returns a new PibImpl instance.
     */
    static registerPibBackend(scheme: string, makePibImpl: (location: string) => PibImpl): void;

    /**
     * Add to the TPM factories map where scheme is the key and makeTpmBackEnd is
     * the value. If your application has its own TPM implementations, this must be
     * called before creating a KeyChain instance which uses your TPM scheme.
     * @param {string} scheme The TPM scheme.
     * @param {function} makeTpmBackEnd A callback which takes the TPM location and
     * returns a new TpmBackEnd instance.
     */
    static registerTpmBackend(scheme: string, makeTpmBackEnd: (location: string) => TpmBackEnd): void;

    // Security v1 methods

    /*****************************************
     *          Identity Management          *
     *****************************************/

    /**
     * Create an identity by creating a pair of Key-Signing-Key (KSK) for this
     * identity and a self-signed certificate of the KSK. If a key pair or
     * certificate for the identity already exists, use it.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params (optional) The key parameters if a key needs to be
     * generated for the identity. If omitted, use KeyChain.getDefaultKeyParams().
     * @param {function} onComplete (optional) This calls onComplete(certificateName)
     * with name of the default certificate of the identity. If omitted, the return
     * value is described below. (Some crypto libraries only use a callback, so
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
     * @return {Name} If onComplete is omitted, return the name of the default
     * certificate of the identity. Otherwise, if onComplete is supplied then return
     * undefined and use onComplete as described above.
     */
    createIdentityAndCertificate(identityName: Name, params?: KeyParams, onComplete?: (certificateName: Name) => any, onError?: (err: any) => any): Name;

    /**
     * Create an identity by creating a pair of Key-Signing-Key (KSK) for this
     * identity and a self-signed certificate of the KSK. If a key pair or
     * certificate for the identity already exists, use it.
     * @deprecated Use createIdentityAndCertificate which returns the
     * certificate name instead of the key name. You can use
     * IdentityCertificate.certificateNameToPublicKeyName to convert the
     * certificate name to the key name.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params (optional) The key parameters if a key needs to be
     * generated for the identity. If omitted, use KeyChain.getDefaultKeyParams().
     * @return {Name} The key name of the auto-generated KSK of the identity.
     */
    createIdentity(identityName: Name, params?: KeyParams): Name;

    /**
     * Get the default identity.
     * @param {function} onComplete (optional) This calls onComplete(identityName)
     * with name of the default identity. If omitted, the return value is described
     * below. (Some crypto libraries only use a callback, so onComplete is required
     * to use these.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Name} If onComplete is omitted, return the name of the default
     * identity. Otherwise, if onComplete is supplied then return undefined and use
     * onComplete as described above.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @throws SecurityException if the default identity is not set. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    getDefaultIdentity(onComplete?: (identityName: Name) => any, onError?: (err: any) => any): Name;

    /**
     * Get the default certificate name of the default identity, which will be used
     * when signing is based on identity and the identity is not specified.
     * @param {function} onComplete (optional) This calls onComplete(certificateName)
     * with name of the default certificate. If omitted, the return value is described
     * below. (Some crypto libraries only use a callback, so onComplete is required
     * to use these.)
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
     * @return {Name} If onComplete is omitted, return the default certificate name.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     * @throws SecurityException if the default identity is not set or the default
     * key name for the identity is not set or the default certificate name for
     * the key name is not set. However, if onComplete and onError are defined, then
     * if there is an exception return undefined and call onError(exception).
     */
    getDefaultCertificateName(onComplete?: (certificate: Certificate) => any, onError?: (err: any) => any): Name;

    /**
     * Generate a pair of RSA keys for the specified identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} isKsk (optional) true for generating a Key-Signing-Key (KSK),
     * false for a Data-Signing-Key (DSK). If omitted, generate a Data-Signing-Key.
     * @param {number} keySize (optional) The size of the key. If omitted, use a
     * default secure key size.
     * @return {Name} The generated key name.
     */
    generateRSAKeyPair(identityName: Name, isKsk?: boolean, keySize?: number): Name;

    /**
     * Set a key as the default key of an identity. The identity name is inferred
     * from keyName.
     * @param {Name} keyName The name of the key.
     * @param {Name} identityNameCheck (optional) The identity name to check that the
     * keyName contains the same identity name. If an empty name, it is ignored.
     * @param {function} onComplete (optional) This calls onComplete() when complete.
     * (Some database libraries only use a callback, so onComplete is required to
     * use these.)
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
     */
    setDefaultKeyForIdentity(keyName: Name, identityNameCheck?: Name, onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Generate a pair of RSA keys for the specified identity and set it as the
     * default key for the identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} isKsk (optional) true for generating a Key-Signing-Key (KSK),
     * false for a Data-Signing-Key (DSK). If omitted, generate a Data-Signing-Key.
     * @param {number} keySize (optional) The size of the key. If omitted, use a
     * default secure key size.
     * @return {Name} The generated key name.
     */
    generateRSAKeyPairAsDefault(identityName: Name, isKsk?: boolean, keySize?: number): Name;

    /**
     * Sign the target. If it is a Data object, set its signature. If it is an
     * array, produce a signature object.
     * @param {Data|Buffer} target If this is a Data object, wire encode for
     * signing, update its signature and key locator field and wireEncoding. If it
     * is an array, sign it and return a Signature object.
     * @param {Name} identityName (optional) The identity name for the key to use for
     * signing.  If omitted, infer the signing identity from the data packet name.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @param {function} onComplete (optional) If target is a Data object, this calls
     * onComplete(data) with the supplied Data object which has been modified to set
     * its signature. If target is a Buffer, this calls
     * onComplete(signature) where signature is the produced Signature object. If
     * omitted, the return value is described below. (Some crypto libraries only use
     * a callback, so onComplete is required to use these.)
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
     * @return {Signature} If onComplete is omitted, return the generated Signature
     * object (if target is a Buffer) or undefined (if target is Data).
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     */
    signByIdentity(target: Data | Buffer, identityName?: Name, wireFormat?: WireFormat, onComplete?: (data: Data) => any, onError?: (err: any) => any): Signature;

    /**
     * Sign the target using DigestSha256.
     * @param {Data|Interest} target If this is a Data object, wire encode for
     * signing, digest it and set its SignatureInfo to a DigestSha256, updating its
     * signature and wireEncoding. If this is an Interest object, wire encode for
     * signing, append a SignatureInfo for DigestSha256 to the Interest name, digest
     * the name components and append a final name component with the signature bits.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     */
    signWithSha256(target: Data | Interest, wireFormat?: WireFormat): void;

    /**
     * Check the signature on the Data object and call either onVerify or
     * onValidationFailed. We use callback functions because verify may fetch
     * information to check the signature.
     * @param {Data} data The Data object with the signature to check.
     * @param {function} onVerified If the signature is verified, this calls
     * onVerified(data).
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onValidationFailed If the signature check fails, this calls
     * onValidationFailed(data, reason) with the Data object and reason string.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {number} stepCount
     */
    verifyData(data: Data, onVerified: (data: Data) => any, onValidationFailed: (data: Data, reason: Reason) => any, stepCount: number): void;

    /**
     * Check the signature on the signed interest and call either onVerify or
     * onValidationFailed. We use callback functions because verify may fetch
     * information to check the signature.
     * @param {Interest} interest The interest with the signature to check.
     * @param {function} onVerified If the signature is verified, this calls
     * onVerified(interest).
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onValidationFailed If the signature check fails, this calls
     * onValidationFailed(interest, reason) with the Interest object and reason
     * string.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param stepCount
     * @param wireFormat
     */
    verifyInterest(interest: Interest, onVerified: (interest: Interest) => any, onValidationFailed: (interest: Interest, reason: Reason) => any, stepCount: number, wireFormat?: WireFormat): void;

    /**
     * Wire encode the target, compute an HmacWithSha256 and update the object.
     * Note: This method is an experimental feature. The API may change.
     * @param {Data|Interest} target If the target is a Data object (which should
     * already have an HmacWithSha256Signature with a KeyLocator for the key name),
     * then update its signature and wire encoding. If the target is an Interest,
     * then append a SignatureInfo to the Interest name, compute an HmacWithSha256
     * signature for the name components and append a final name component with the
     * signature bits.
     * @param {Blob} key The key for the HmacWithSha256.
     * @param {Name} keyName (needed if target is an Interest) The name of the key
     * for the KeyLocator in the SignatureInfo which is added to the Interest name.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the target. If omitted, use WireFormat getDefaultWireFormat().
     */
    signWithHmacWithSha256(target: Data | Interest, key: Blob, keyName: Name, wireFormat?: WireFormat): void;

    /**
     * Compute a new HmacWithSha256 for the target and verify it against the
     * signature value.
     * Note: This method is an experimental feature. The API may change.
     * @param {Data} data The Data object to verify.
     * @param {Blob} key The key for the HmacWithSha256.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @return {boolean} True if the signature verifies, otherwise false.
     */
    verifyDataWithHmacWithSha256(data: Data, key: Blob, wireFormat?: WireFormat): boolean

    /**
     * Compute a new HmacWithSha256 for all but the final name component and verify
     * it against the signature value in the final name component.
     * Note: This method is an experimental feature. The API may change.
     * @param {Interest} interest The Interest object to verify.
     * @param {Blob} key The key for the HmacWithSha256.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @return {boolean} True if the signature verifies, otherwise false.
     */
    verifyInterestWithHmacWithSha256(interest: Interest, key: Blob, wireFormat?: WireFormat): boolean;
}

// no declaration because these types are rarely used
export class Pib {
}

export class Certificate {

}

export class Tpm {
}

export class SafeBag {

}

export class PibImpl {

}

export class TpmBackEnd {

}

export class Reason {

}