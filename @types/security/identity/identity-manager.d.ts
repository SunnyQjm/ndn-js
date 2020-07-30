import {IdentityStorage} from "./identity-storage";
import {PrivateKeyStorage} from "./private-key-storage";
import {Name} from "../../name";
import {KeyParams} from "../key-params";
import {SyncPromise} from "../../util";
import {CertificateSubjectDescription, IdentityCertificate, PublicKey} from "../certificate";
import {Data} from "../../data";
import {WireFormat} from "../../encoding";
import {Signature} from "../../signature";
import {Interest} from "../../interest";

export class IdentityManager {
    /**
     * An IdentityManager is the interface of operations related to identity, keys,
     * and certificates.
     *
     * Create a new IdentityManager to use the IdentityStorage and
     * PrivateKeyStorage.
     * @param {IdentityStorage} identityStorage An object of a subclass of
     * IdentityStorage. In Node.js, if this is omitted then use BasicIdentityStorage.
     * @param {PrivateKeyStorage} privateKeyStorage An object of a subclass of
     * PrivateKeyStorage. In Node.js, if this is omitted then use the default
     * PrivateKeyStorage for your system, which is FilePrivateKeyStorage for any
     * system other than OS X. (OS X key chain storage is not yet implemented, so
     * you must supply a different PrivateKeyStorage.)
     * @throws SecurityException if this is not in Node.js and identityStorage or
     * privateKeyStorage is omitted.
     * @constructor
     */
    constructor(identityStorage: IdentityStorage, privateKeyStorage: PrivateKeyStorage);

    /**
     * Create an identity by creating a pair of Key-Signing-Key (KSK) for this
     * identity and a self-signed certificate of the KSK. If a key pair or
     * certificate for the identity already exists, use it.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params The key parameters if a key needs to be generated
     * for the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the name of the default
     * certificate of the identity.
     */
    createIdentityAndCertificatePromise(identityName: Name, params: KeyParams, useSync?: boolean): Promise<Name> | SyncPromise;

    /**
     * Create an identity by creating a pair of Key-Signing-Key (KSK) for this
     * identity and a self-signed certificate of the KSK. If a key pair or
     * certificate for the identity already exists, use it.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params The key parameters if a key needs to be generated
     * for the identity.
     * @param {function} onComplete (optional) This calls onComplete(certificateName)
     * with the name of the default certificate of the identity. If omitted, the
     * return value is described below. (Some crypto libraries only use a callback,
     * so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Name} If onComplete is omitted, return the name of the default
     * certificate of the identity. Otherwise, if onComplete is supplied then return
     * undefined and use onComplete as described above.
     */
    createIdentityAndCertificate(identityName: Name, params: KeyParams, onComplete?: (certificateName: Name) => any,
                                 onError?: (err: any) => any);

    /**
     * Create an identity by creating a pair of Key-Signing-Key (KSK) for this
     * identity and a self-signed certificate of the KSK. If a key pair or
     * certificate for the identity already exists, use it.
     * @deprecated Use createIdentityAndCertificate which returns the
     * certificate name instead of the key name. You can use
     * IdentityCertificate.certificateNameToPublicKeyName to convert the
     * certificate name to the key name.
     * @param {Name} identityName The name of the identity.
     * @param {KeyParams} params The key parameters if a key needs to be generated
     * for the identity.
     * @return {Name} The key name of the auto-generated KSK of the identity.
     */
    createIdentity(identityName: Name, params: KeyParams): Name;

    /**
     * Delete the identity from the public and private key storage. If the
     * identity to be deleted is the current default system default, this will not
     * delete the identity and will return immediately.
     * @param {Name} identityName The name of the identity.
     * @param {function} onComplete (optional) This calls onComplete() when the
     * operation is complete. If omitted, do not use it. (Some database libraries
     * only use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    deleteIdentity(identityName: Name, onComplete?: () => any, onError?: (err: any) => any);

    /**
     * Set the default identity.  If the identityName does not exist, then clear the
     * default identity so that getDefaultIdentity() throws an exception.
     * @param {Name} identityName The default identity name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the default
     * identity is set.
     */
    setDefaultIdentityPromise(identityName: Name, useSync: boolean): Promise<any> | SyncPromise;

    /**
     * Set the default identity.  If the identityName does not exist, then clear the
     * default identity so that getDefaultIdentity() throws an exception.
     * @param {Name} identityName The default identity name.
     * @param {function} onComplete (optional) This calls onComplete() when complete.
     * (Some database libraries only use a callback, so onComplete is required to
     * use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    setDefaultIdentity(identityName: Name, onComplete?: () => any, onError?: (err: any) => any);

    /**
     * Get the default identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the Name of default
     * identity, or a promise rejected with SecurityException if the default
     * identity is not set.
     */
    getDefaultIdentityPromise(useSync?: boolean): Promise<Name> | SyncPromise;

    /**
     * Get the default identity.
     * @param {function} onComplete (optional) This calls onComplete(identityName)
     * with name of the default identity. If omitted, the return value is described
     * below. (Some database libraries only use a callback, so onComplete is required
     * to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Name} If onComplete is omitted, return the name of the default
     * identity. Otherwise, if onComplete is supplied then return undefined and use
     * onComplete as described above.
     * @throws SecurityException if the default identity is not set. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    getDefaultIdentity(onComplete?: (identifyName: Name) => any, onError?: (err: any) => any): Name;

    /**
     * Get the certificate of the default identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the requested
     * IdentityCertificate or null if not found.
     */
    getDefaultCertificatePromise(useSync?: boolean): Promise<IdentityCertificate> | SyncPromise;

    /**
     * Generate a pair of RSA keys for the specified identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} isKsk True for generating a Key-Signing-Key (KSK), false for
     * a Data-Signing-Key (DSK).
     * @param {number} keySize The size of the key.
     * @return {Name} The generated key name.
     */
    generateRSAKeyPair(identityName: Name, isKsk: boolean, keySize: number): Name;

    /**
     * Set a key as the default key of an identity. The identity name is inferred
     * from keyName.
     * @param {Name} keyName The name of the key.
     * @param {Name} identityNameCheck (optional) The identity name to check that the
     * keyName contains the same identity name. If an empty name, it is ignored.
     * @param {function} onComplete (optional) This calls onComplete() when complete.
     * (Some database libraries only use a callback, so onComplete is required to
     * use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    setDefaultKeyForIdentity(keyName: Name, identityNameCheck: Name, onComplete?: () => any,
                             onError?: (err: any) => any);

    /**
     * Get the default key for an identity.
     * @param {Name} identityName The name of the identity.
     * @param {function} onComplete (optional) This calls onComplete(keyName)
     * with name of the default key. If omitted, the return value is described
     * below. (Some database libraries only use a callback, so onComplete is required
     * to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Name} If onComplete is omitted, return the default key name.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     * @throws SecurityException if the default key name for the identity is not set.
     * However, if onComplete and onError are defined, then if there is an exception
     * return undefined and call onError(exception).
     */
    getDefaultKeyNameForIdentity(identityName: Name, onComplete?: (keyName: Name) => any, onError?: (err: any) => any): Name;

    /**
     * Generate a pair of RSA keys for the specified identity and set it as default
     * key for the identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} isKsk True for generating a Key-Signing-Key (KSK), false for
     * a Data-Signing-Key (DSK).
     * @param {number} keySize The size of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If false, this may return a SyncPromise or an async
     * Promise.
     * @return {Promise|SyncPromise} A promise which returns the generated key name.
     */
    generateRSAKeyPairAsDefaultPromise(identityName: Name, isKsk: boolean, keySize: number, useSync?: boolean): Promise<Name> | SyncPromise;

    /**
     * Generate a pair of RSA keys for the specified identity and set it as default
     * key for the identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} isKsk True for generating a Key-Signing-Key (KSK), false for
     * a Data-Signing-Key (DSK).
     * @param {number} keySize The size of the key.
     * @return {Name} The generated key name.
     */
    generateRSAKeyPairAsDefault(identityName: Name, isKsk: boolean, keySize: number): Name;

    /**
     * Get the public key with the specified name.
     * @param {Name} keyName The name of the key.
     * @param {function} onComplete (optional) This calls onComplete(publicKey)
     * with PublicKey. If omitted, the return value is described below. (Some database
     * libraries only use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {PublicKey} If onComplete is omitted, return the public key.
     * Otherwise, if onComplete is supplied then return undefined and use onComplete
     * as described above.
     */
    getPublicKey(keyName: Name, onComplete?: (publicKey: PublicKey) => any, onError?: (err: any) => any): PublicKey;


    // TODO: Add two versions of createIdentityCertificate.


    /**
     * Prepare an unsigned identity certificate.
     * @param {Name} keyName The key name, e.g., `/{identity_name}/ksk-123456`.
     * @param {PublicKey} publicKey (optional) The public key to sign. If ommited,
     * use the keyName to get the public key from the identity storage.
     * @param {Name} signingIdentity The signing identity.
     * @param {number} notBefore See IdentityCertificate.
     * @param {number} notAfter See IdentityCertificate.
     * @param {Array<CertificateSubjectDescription>} subjectDescription A list of
     * CertificateSubjectDescription. See IdentityCertificate. If null or empty,
     * this adds a an ATTRIBUTE_NAME based on the keyName.
     * @param {Name} certPrefix (optional) The prefix before the `KEY` component. If
     * null or omitted, this infers the certificate name according to the relation
     * between the signingIdentity and the subject identity. If the signingIdentity
     * is a prefix of the subject identity, `KEY` will be inserted after the
     * signingIdentity, otherwise `KEY` is inserted after subject identity (i.e.,
     * before `ksk-...`).
     * @param {function} onComplete (optional) This calls onComplete(certificate)
     * with the unsigned IdentityCertificate, or null if the inputs are invalid. If
     * omitted, the return value is described below. (Some database libraries only
     * use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {IdentityCertificate} If onComplete is omitted, return the the
     * unsigned IdentityCertificate, or null if the inputs are invalid. Otherwise,
     * if onComplete is supplied then return undefined and use onComplete as
     * described above.
     */
    prepareUnsignedIdentityCertificate(keyName: Name, publicKey: PublicKey, signingIdentity: Name, notBefore: number,
                                       notAfter: number, subjectDescription: CertificateSubjectDescription[],
                                       certPrefix?: Name, onComplete?: (certificate: IdentityCertificate) => any,
                                       onError?: (err: any) => any): IdentityCertificate;

    /**
     * Prepare an unsigned identity certificate.
     * @param {Name} keyName The key name, e.g., `/{identity_name}/ksk-123456`.
     * @param {PublicKey} publicKey (optional) The public key to sign. If ommited,
     * use the keyName to get the public key from the identity storage.
     * @param {Name} signingIdentity The signing identity.
     * @param {number} notBefore See IdentityCertificate.
     * @param {number} notAfter See IdentityCertificate.
     * @param {Array<CertificateSubjectDescription>} subjectDescription A list of
     * CertificateSubjectDescription. See IdentityCertificate. If null or empty,
     * this adds a an ATTRIBUTE_NAME based on the keyName.
     * @param {Name} certPrefix (optional) The prefix before the `KEY` component. If
     * null or omitted, this infers the certificate name according to the relation
     * between the signingIdentity and the subject identity. If the signingIdentity
     * is a prefix of the subject identity, `KEY` will be inserted after the
     * signingIdentity, otherwise `KEY` is inserted after subject identity (i.e.,
     * before `ksk-...`).
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the unsigned
     * IdentityCertificate, or that returns null if the inputs are invalid.
     */
    prepareUnsignedIdentityCertificatePromise(keyName: Name, publicKey: PublicKey, signingIdentity: Name, notBefore: number,
                                              notAfter: number, subjectDescription: CertificateSubjectDescription[],
                                              certPrefix?: Name, useSync?: boolean): Promise<IdentityCertificate> | SyncPromise;

    /**
     * Add a certificate into the public key identity storage.
     * @param {IdentityCertificate} certificate The certificate to to added. This
     * makes a copy of the certificate.
     * @param {function} onComplete (optional) This calls onComplete() when complete.
     * (Some database libraries only use a callback, so onComplete is required to
     * use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    addCertificate(certificate: IdentityCertificate, onComplete?: () => any, onError?: (err: any) => any);

    /**
     * Set the certificate as the default for its corresponding key.
     * @param {IdentityCertificate} certificate The certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If false, this may return a SyncPromise or an async
     * Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the default
     * certificate is set.
     */
    setDefaultCertificateForKeyPromise(certificate: IdentityCertificate, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Set the certificate as the default for its corresponding key.
     * @param {IdentityCertificate} certificate The certificate.
     * @param {function} onComplete (optional) This calls onComplete() when complete.
     * (Some database libraries only use a callback, so onComplete is required to
     * use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    setDefaultCertificateForKey(certificate: IdentityCertificate, onComplete?: () => any, onError?: (err: any) => any);

    /**
     * Add a certificate into the public key identity storage and set the
     * certificate as the default for its corresponding identity.
     * @param {IdentityCertificate} certificate The certificate to be added. This
     * makes a copy of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If false, this may return a SyncPromise or an async
     * Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the certificate
     * is added.
     */
    addCertificateAsIdentityDefaultPromise(certificate: IdentityCertificate, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Add a certificate into the public key identity storage and set the
     * certificate as the default of its corresponding key.
     * @param {IdentityCertificate} certificate The certificate to be added. This
     * makes a copy of the certificate.
     * @param {function} onComplete (optional) This calls onComplete() when complete.
     * (Some database libraries only use a callback, so onComplete is required to use
     * these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    addCertificateAsDefault(certificate: IdentityCertificate, onComplete?: () => any, onError?: (err: any) => any);

    /**
     * Get a certificate which is still valid with the specified name.
     * @param {Name} certificateName The name of the requested certificate.
     * @param {function} onComplete (optional) This calls onComplete(certificate)
     * with the requested IdentityCertificate. If omitted, the return value is
     * described below. (Some database libraries only use a callback, so onComplete
     * is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {IdentityCertificate} If onComplete is omitted, return the requested
     * certificate. Otherwise, if onComplete is supplied then return undefined and
     * use onComplete as described above.
     */
    getCertificate(certificateName: Name, onComplete?: (certificate: IdentityCertificate) => any,
                   onError?: (err: any) => any): IdentityCertificate;

    /**
     * Get the default certificate name for the specified identity.
     * @param {Name} identityName The identity name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the default certificate
     * Name, or a promise rejected with SecurityException if the default key name
     * for the identity is not set or the default certificate name for the key name
     * is not set.
     */
    getDefaultCertificateNameForIdentityPromise(identityName: Name, useSync?: boolean): Promise<Name> | SyncPromise;

    /**
     * Get the default certificate name for the specified identity, which will be
     * used when signing is performed based on identity.
     * @param {Name} identityName The name of the specified identity.
     * @param {function} onComplete (optional) This calls onComplete(certificateName)
     * with name of the default certificate. If omitted, the return value is described
     * below. (Some database libraries only use a callback, so onComplete is required
     * to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Name} If onComplete is omitted, return the default certificate name.
     * Otherwise, if onComplete is supplied then return undefined and use
     * onComplete as described above.
     * @throws SecurityException if the default key name for the identity is not
     * set or the default certificate name for the key name is not set. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    getDefaultCertificateNameForIdentity(identityName: Name, onComplete?: (certificateName: Name) => any,
                                         onError?: (err: any) => any): Name;

    /**
     * Get the default certificate name of the default identity, which will be used
     * when signing is based on identity and the identity is not specified.
     * @param {function} onComplete (optional) This calls onComplete(certificateName)
     * with name of the default certificate. If omitted, the return value is described
     * below. (Some database libraries only use a callback, so onComplete is required
     * to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Name} If onComplete is omitted, return the default certificate name.
     * Otherwise, if onComplete is supplied then return undefined and use
     * onComplete as described above.
     * @throws SecurityException if the default identity is not set or the default
     * key name for the identity is not set or the default certificate name for
     * the key name is not set. However, if onComplete and onError are defined, then
     * if there is an exception return undefined and call onError(exception).
     */
    getDefaultCertificateName(onComplete?: (certificateName: Name) => any, onError?: (err: any) => any): Name;

    /**
     * Append all the identity names to the nameList.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default identity name. If
     * false, add only the non-default identity names.
     * @param {function} onComplete (optional) This calls onComplete() when finished
     * adding to nameList. If omitted, this returns when complete. (Some database
     * libraries only use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {void} If onComplete is omitted, return when complete. Otherwise, if
     * onComplete is supplied then return undefined and use onComplete as described
     * above.
     */
    getAllIdentities(nameList: Name[], isDefault: boolean, onComplete?: () => {},
                     onError?: (err: any) => any): void;

    /**
     * Append all the key names of a particular identity to the nameList.
     * @param {Name} identityName The identity name to search for.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default key name. If false,
     * add only the non-default key names.
     * @param {function} onComplete (optional) This calls onComplete() when finished
     * adding to nameList. If omitted, this returns when complete. (Some database
     * libraries only use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {void} If onComplete is omitted, return when complete. Otherwise, if
     * onComplete is supplied then return undefined and use onComplete as described
     * above.
     */
    getAllKeyNamesOfIdentity(identityName: Name, nameList: Name[], isDefault: boolean,
                             onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Append all the certificate names of a particular key name to the nameList.
     * @param {Name} keyName The key name to search for.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default certificate name. If
     * false, add only the non-default certificate names.
     * @param {function} onComplete (optional) This calls onComplete() when finished
     * adding to nameList. If omitted, this returns when complete. (Some database
     * libraries only use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {void} If onComplete is omitted, return when complete. Otherwise, if
     * onComplete is supplied then return undefined and use onComplete as described
     * above.
     */
    getAllCertificateNamesOfKey(keyName: Name, nameList: Name[], isDefault: boolean,
                                onComplete?: () => any, onError?: (err: any) => any): void;

    /**
     * Sign the Data packet or byte array data based on the certificate name.
     * @param {Data|Buffer} target If this is a Data object, wire encode for signing,
     * update its signature and key locator field and wireEncoding. If it is a
     * Buffer, sign it to produce a Signature object.
     * @param {Name} certificateName The Name identifying the certificate which
     * identifies the signing key.
     * @param {WireFormat} wireFormat (optional) The WireFormat for calling encodeData, or
     * WireFormat.getDefaultWireFormat() if omitted.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the generated Signature
     * object (if target is a Buffer) or the target (if target is Data).
     */
    signByCertificatePromise(target: Data | Buffer, certificateName: Name, wireFormat?: WireFormat, useSync?: boolean): Promise<Signature> | SyncPromise;

    /**
     * Sign the Data packet or byte array data based on the certificate name.
     * @param {Data|Buffer} target If this is a Data object, wire encode for signing,
     * update its signature and key locator field and wireEncoding. If it is a
     * Buffer, sign it to produce a Signature object.
     * @param {Name} certificateName The Name identifying the certificate which
     * identifies the signing key.
     * @param {WireFormat} wireFormat (optional) The WireFormat for calling encodeData, or
     * WireFormat.getDefaultWireFormat() if omitted.
     * @param {function} onComplete (optional) If target is a Data object, this calls
     * onComplete(data) with the supplied Data object which has been modified to set
     * its signature. If target is a Buffer, this calls onComplete(signature) where
     * signature is the produced Signature object. If omitted, the return value is
     * described below. (Some crypto libraries only use a callback, so onComplete is
     * required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Signature} If onComplete is omitted, return the generated Signature
     * object (if target is a Buffer) or the target (if target is Data). Otherwise,
     * if onComplete is supplied then return undefined and use onComplete as described
     * above.
     */
    signByCertificate(target: Data | Buffer, certificateName: Name, wireFormat?: WireFormat,
                      onComplete?: (signature: Signature) => any, onError?: (err: any) => any): Signature;

    /**
     * Append a SignatureInfo to the Interest name, sign the name components and
     * append a final name component with the signature bits.
     * @param {Interest} interest The Interest object to be signed. This appends
     * name components of SignatureInfo and the signature bits.
     * @param {Name} certificateName The certificate name of the key to use for
     * signing.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the supplied Interest.
     */
    signInterestByCertificatePromise(interest: Interest, certificateName: Name, wireFormat?: WireFormat
        , useSync?: boolean): Promise<Interest> | SyncPromise;

    /**
     * Append a SignatureInfo to the Interest name, sign the name components and
     * append a final name component with the signature bits.
     * @param {Interest} interest The Interest object to be signed. This appends
     * name components of SignatureInfo and the signature bits.
     * @param {Name} certificateName The certificate name of the key to use for
     * signing.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     * @param {function} onComplete (optional) This calls onComplete(interest) with
     * the supplied Interest object which has been modified to set its signature. If
     * omitted, then return when the interest has been signed. (Some crypto
     * libraries only use a callback, so onComplete is required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * @return {Signature} If onComplete is omitted, return the interest. Otherwise,
     * if onComplete is supplied then return undefined and use onComplete as
     * described above.
     */
    signInterestByCertificate(interest: Interest, certificateName: Name, wireFormat?: WireFormat,
                              onComplete?: (interest: Interest) => any, onError?: (err: any) => any): Interest;

    /**
     * Wire encode the Data object, digest it and set its SignatureInfo to a
     * DigestSha256.
     * @param {Data} data The Data object to be signed. This updates its signature
     * and wireEncoding.
     * @param {WireFormat} wireFormat (optional) The WireFormat for calling encodeData, or
     * WireFormat.getDefaultWireFormat() if omitted.
     */
    signWithSha256(data: Data, wireFormat?: WireFormat);

    /**
     * Append a SignatureInfo for DigestSha256 to the Interest name, digest the
     * name components and append a final name component with the signature bits
     * (which is the digest).
     * @param {Interest} interest The Interest object to be signed. This appends
     * name components of SignatureInfo and the signature bits.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the input. If omitted, use WireFormat getDefaultWireFormat().
     */
    signInterestWithSha256(interest: Interest, wireFormat?: WireFormat);

    /**
     * Generate a self-signed certificate for a public key.
     * @param {Name} keyName The name of the public key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If false, this may return a SyncPromise or an async
     * Promise.
     * @return {Promise|SyncPromise} A promise which returns the generated
     * IdentityCertificate.
     */
    selfSignPromise(keyName: Name, useSync?: boolean): Promise<IdentityCertificate> | SyncPromise;

    /**
     * Generate a self-signed certificate for a public key.
     * @param {Name} keyName The name of the public key.
     * @param {function} onComplete (optional) This calls onComplete(certificate)
     * with the the generated IdentityCertificate. If omitted, the return value is
     * described below. (Some crypto libraries only use a callback, so onComplete is
     * required to use these.)
     * @return {IdentityCertificate} If onComplete is omitted, return the
     * generated certificate. Otherwise, if onComplete is supplied then return
     * undefined and use onComplete as described above.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    selfSign(keyName: Name, onComplete?: (certificate: IdentityCertificate) => any, onError?: (err: any) => any): IdentityCertificate;

    /**
     * Get the public key name from the full certificate name.
     *
     * @param {Name} certificateName The full certificate name.
     * @return {Name} The related public key name.
     * TODO: Move this to IdentityCertificate
     */
    static certificateNameToPublicKeyName(certificateName: Name): Name;

    /**
     * Return a new Signature object based on the signature algorithm of the public
     * key with keyName (derived from certificateName).
     * @param {Name} certificateName The certificate name.
     * @param {Array} digestAlgorithm Set digestAlgorithm[0] to the signature
     * algorithm's digest algorithm, e.g. DigestAlgorithm.SHA256.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If false, this may return a SyncPromise or an async
     * Promise.
     * @return {Promise|SyncPromise} A promise which returns a new object of the
     * correct subclass of Signature.
     */
    makeSignatureByCertificatePromise(certificateName: Name, digestAlgorithm: any[], useSync?: boolean): Promise<Signature> | SyncPromise;

    /**
     * A private method to generate a pair of keys for the specified identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} isKsk true for generating a Key-Signing-Key (KSK), false for
     * a Data-Signing-Key (DSK).
     * @param {KeyParams} params The parameters of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If false, this may return a SyncPromise or an async
     * Promise.
     * @return {Promise|SyncPromise} A promise which returns the generated key name.
     */
    generateKeyPairPromise(identityName: Name, isKsk: boolean, params: KeyParams, useSync?: boolean): Promise<Name> | SyncPromise;
}