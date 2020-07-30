import {Name} from "../../name";
import {Blob, SyncPromise} from "../../util";
import {IdentityCertificate} from "../certificate";

export class IdentityStorage {
    /**
     * IdentityStorage is a base class for the storage of identity, public keys and
     * certificates. Private keys are stored in PrivateKeyStorage.
     * This is an abstract base class.  A subclass must implement the methods.
     * @constructor
     */
    constructor();

    /**
     * Check if the specified identity already exists.
     * @param {Name} identityName The identity name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns true if the identity exists.
     */
    doesIdentityExistPromise(identityName: Name, useSync?: boolean): Promise<boolean>;

    /**
     * Check if the specified identity already exists.
     * @param {Name} identityName The identity name.
     * @return {boolean} true if the identity exists, otherwise false.
     * @throws Error If doesIdentityExistPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    doesIdentityExist(identityName: Name): boolean;

    /**
     * Add a new identity. Do nothing if the identity already exists.
     * @param {Name} identityName The identity name to be added.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the identity is added.
     */
    addIdentityPromise(identityName: Name, useSync?: boolean): Promise<any>;

    /**
     * Add a new identity. Do nothing if the identity already exists.
     * @param {Name} identityName The identity name to be added.
     * @throws Error If addIdentityPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    addIdentity(identityName: Name);

    /**
     * Revoke the identity.
     * @return {boolean} true if the identity was revoked, false if not.
     */
    revokeIdentity(): boolean;

    /**
     * Generate a name for a new key belonging to the identity.
     * @param {Name} identityName The identity name.
     * @param {boolean} useKsk If true, generate a KSK name, otherwise a DSK name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns the generated key Name.
     */
    getNewKeyNamePromise(identityName: Name, useKsk: boolean, useSync?: boolean): Promise<Name> | SyncPromise;

    /**
     * Generate a name for a new key belonging to the identity.
     * @param {Name} identityName The identity name.
     * @param {boolean} useKsk If true, generate a KSK name, otherwise a DSK name.
     * @return {Name} The generated key name.
     * @throws Error If getNewKeyNamePromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    getNewKeyName(identityName: Name, useKsk: boolean): Name;

    /**
     * Check if the specified key already exists.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns true if the key exists.
     */
    doesKeyExistPromise(keyName: Name, useSync?: boolean): Promise<boolean>;

    /**
     * Check if the specified key already exists.
     * @param {Name} keyName The name of the key.
     * @return {boolean} true if the key exists, otherwise false.
     * @throws Error If doesKeyExistPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    doesKeyExist(keyName: Name): boolean;

    /**
     * Add a public key to the identity storage. Also call addIdentity to ensure
     * that the identityName for the key exists. However, if the key already
     * exists, do nothing.
     * @param {Name} keyName The name of the public key to be added.
     * @param {number} keyType Type of the public key to be added from KeyType, such
     * as KeyType.RSA..
     * @param {Blob} publicKeyDer A blob of the public key DER to be added.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when complete.
     */
    addKeyPromise(keyName: Name, keyType: number, publicKeyDer: Blob, useSync?: boolean): Promise<any>;

    /**
     * Add a public key to the identity storage. Also call addIdentity to ensure
     * that the identityName for the key exists.
     * @param {Name} keyName The name of the public key to be added.
     * @param {number} keyType Type of the public key to be added from KeyType, such
     * as KeyType.RSA..
     * @param {Blob} publicKeyDer A blob of the public key DER to be added.
     * @throws SecurityException if a key with the keyName already exists.
     * @throws Error If addKeyPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    addKey(keyName: Name, keyType: number, publicKeyDer: Blob);

    /**
     * Get the public key DER blob from the identity storage.
     * @param {Name} keyName The name of the requested public key.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns the DER Blob, or a promise rejected
     * with SecurityException if the key doesn't exist.
     */
    getKeyPromise(keyName: Name, useSync?: boolean): Promise<Blob>;

    /**
     * Get the public key DER blob from the identity storage.
     * @param {Name} keyName The name of the requested public key.
     * @return {Blob} The DER Blob.
     * @throws SecurityException if the key doesn't exist.
     * @throws Error If getKeyPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    getKey(keyName: Name): Blob;

    /**
     * Activate a key.  If a key is marked as inactive, its private part will not be
     * used in packet signing.
     * @param {Name} keyName name of the key
     */
    activateKey(keyName: Name);

    /**
     * Deactivate a key. If a key is marked as inactive, its private part will not
     * be used in packet signing.
     * @param {Name} keyName name of the key
     */
    deactivateKey(keyName: Name);

    /**
     * Check if the specified certificate already exists.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns true if the certificate exists.
     */
    doesCertificateExistPromise(certificateName: Name, useSync?: boolean): Promise<boolean>;

    /**
     * Check if the specified certificate already exists.
     * @param {Name} certificateName The name of the certificate.
     * @return {boolean} true if the certificate exists, otherwise false.
     * @throws Error If doesCertificateExistPromise doesn't return a SyncPromise
     * which is already fulfilled.
     */
    doesCertificateExist(certificateName: Name): boolean;

    /**
     * Add a certificate to the identity storage. Also call addKey to ensure that
     * the certificate key exists. If the certificate is already installed, don't
     * replace it.
     * @param {IdentityCertificate} certificate The certificate to be added.  This
     * makes a copy of the certificate.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when finished.
     */
    addCertificatePromise(certificate: IdentityCertificate, useSync?: boolean): Promise<any>;

    /**
     * Add a certificate to the identity storage.
     * @param {IdentityCertificate} certificate The certificate to be added.  This
     * makes a copy of the certificate.
     * @throws SecurityException if the certificate is already installed.
     * @throws Error If addCertificatePromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    addCertificate(certificate: IdentityCertificate);

    /**
     * Get a certificate from the identity storage.
     * @param {Name} certificateName The name of the requested certificate.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns the requested
     * IdentityCertificate, or a promise rejected with SecurityException if the
     * certificate doesn't exist.
     */
    getCertificatePromise(certificateName: Name, useSync?: boolean): Promise<IdentityCertificate>;

    /**
     * Get a certificate from the identity storage.
     * @param {Name} certificateName The name of the requested certificate.
     * @return {IdentityCertificate} The requested certificate.
     * @throws SecurityException if the certificate doesn't exist.
     * @throws Error If getCertificatePromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    getCertificate(certificateName: Name): IdentityCertificate;

    /**
     * Get the TPM locator associated with this storage.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns the TPM locator, or a promise
     * rejected with SecurityException if the TPM locator doesn't exist.
     */
    getTpmLocatorPromise(useSync?: boolean): Promise<any>;

    /**
     * Get the TPM locator associated with this storage.
     * @return {string} The TPM locator.
     * @throws SecurityException if the TPM locator doesn't exist.
     * @throws Error If getTpmLocatorPromise doesn't return a SyncPromise which is
     * already fulfilled.
     */
    getTpmLocator(): string;

    /*****************************************
     *           Get/Set Default             *
     *****************************************/

    /**
     * Get the default identity.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns the Name of default identity, or a
     * promise rejected with SecurityException if the default identity is not set.
     */
    getDefaultIdentityPromise(useSync?: boolean): Promise<Name>;

    /**
     * Get the default identity.
     * @return {Name} The name of default identity.
     * @throws SecurityException if the default identity is not set.
     * @throws Error If getDefaultIdentityPromise doesn't return a SyncPromise
     * which is already fulfilled.
     */
    getDefaultIdentity(): Name;

    /**
     * Get the default key name for the specified identity.
     * @param {Name} identityName The identity name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns the default key Name, or a promise
     * rejected with SecurityException if the default key name for the identity is
     * not set.
     */
    getDefaultKeyNameForIdentityPromise(identityName: Name, useSync?: boolean): Promise<Name>;

    /**
     * Get the default key name for the specified identity.
     * @param {Name} identityName The identity name.
     * @return {Name} The default key name.
     * @throws SecurityException if the default key name for the identity is not set.
     * @throws Error If getDefaultKeyNameForIdentityPromise doesn't return a
     * SyncPromise which is already fulfilled.
     */
    getDefaultKeyNameForIdentity(identityName: Name): Name;

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
     * Get the default certificate name for the specified identity.
     * @param {Name} identityName The identity name.
     * @return {Name} The default certificate name.
     * @throws SecurityException if the default key name for the identity is not
     * set or the default certificate name for the key name is not set.
     * @throws Error If getDefaultCertificateNameForIdentityPromise doesn't return
     * a SyncPromise which is already fulfilled.
     */
    getDefaultCertificateNameForIdentity(identityName: Name): Name;

    /**
     * Get the default certificate name for the specified key.
     * @param {Name} keyName The key name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which returns the default certificate Name, or a
     * promise rejected with SecurityException if the default certificate name for
     * the key name is not set.
     */
    getDefaultCertificateNameForKeyPromise(keyName: Name, useSync?: boolean): Promise<Name>;

    /**
     * Get the default certificate name for the specified key.
     * @param {Name} keyName The key name.
     * @return {Name} The default certificate name.
     * @throws SecurityException if the default certificate name for the key name
     * is not set.
     * @throws Error If getDefaultCertificateNameForKeyPromise doesn't return a
     * SyncPromise which is already fulfilled.
     */
    getDefaultCertificateNameForKey(keyName: Name): Name;

    /**
     * Append all the identity names to the nameList.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default identity name. If
     * false, add only the non-default identity names.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the names are added to
     * nameList.
     */
    getAllIdentitiesPromise(nameList: Name[], isDefault: boolean, useSync?: boolean): Promise<any>;

    /**
     * Append all the key names of a particular identity to the nameList.
     * @param {Name} identityName The identity name to search for.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default key name. If false,
     * add only the non-default key names.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the names are added to
     * nameList.
     */
    getAllKeyNamesOfIdentityPromise(identityName: Name, nameList: Name[], isDefault: boolean, useSync?: boolean): Promise<any>;

    /**
     * Append all the certificate names of a particular key name to the nameList.
     * @param {Name} keyName The key name to search for.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default certificate name.
     * If false, add only the non-default certificate names.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the names are added to
     * nameList.
     */
    getAllCertificateNamesOfKeyPromise(keyName: Name, nameList: Name[], isDefault: boolean, useSync?: boolean): Promise<any>;

    /**
     * Append all the key names of a particular identity to the nameList.
     * @param {Name} identityName The identity name to search for.
     * @param {Array<Name>} nameList Append result names to nameList.
     * @param {boolean} isDefault If true, add only the default key name. If false,
     * add only the non-default key names.
     * @throws Error If getAllKeyNamesOfIdentityPromise doesn't return a
     * SyncPromise which is already fulfilled.
     */
    getAllKeyNamesOfIdentity(identityName: Name, nameList: Name[], isDefault: boolean);

    /**
     * Set the default identity.  If the identityName does not exist, then clear the
     * default identity so that getDefaultIdentity() throws an exception.
     * @param {Name} identityName The default identity name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the default identity is set.
     */
    setDefaultIdentityPromise(identityName: Name, useSync?: boolean): Promise<any>;

    /**
     * Set the default identity.  If the identityName does not exist, then clear the
     * default identity so that getDefaultIdentity() throws an exception.
     * @param {Name} identityName The default identity name.
     * @throws Error If setDefaultIdentityPromise doesn't return a SyncPromise which
     * is already fulfilled.
     */
    setDefaultIdentity(identityName: Name);

    /**
     * Set a key as the default key of an identity. The identity name is inferred
     * from keyName.
     * @param {Name} keyName The name of the key.
     * @param {Name} identityNameCheck (optional) The identity name to check that the
     * keyName contains the same identity name. If an empty name, it is ignored.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the default key name is set.
     */
    setDefaultKeyNameForIdentityPromise(keyName: Name, identityNameCheck: Name, useSync?: boolean): Promise<any>;

    /**
     * Set a key as the default key of an identity. The identity name is inferred
     * from keyName.
     * @param {Name} keyName The name of the key.
     * @param {Name} identityNameCheck (optional) The identity name to check that the
     * keyName contains the same identity name. If an empty name, it is ignored.
     * @throws Error If setDefaultKeyNameForIdentityPromise doesn't return a
     * SyncPromise which is already fulfilled.
     */
    setDefaultKeyNameForIdentity(keyName: Name, identityNameCheck: Name);

    /**
     * Set the default key name for the specified identity.
     * @param {Name} keyName The key name.
     * @param {Name} certificateName The certificate name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the default certificate name
     * is set.
     */
    setDefaultCertificateNameForKeyPromise(keyName: Name, certificateName: Name, useSync?: boolean): Promise<any>;

    /**
     * Set the default key name for the specified identity.
     * @param {Name} keyName The key name.
     * @param {Name} certificateName The certificate name.
     * @throws Error If setDefaultCertificateNameForKeyPromise doesn't return a
     * SyncPromise which is already fulfilled.
     */
    setDefaultCertificateNameForKey(keyName: Name, certificateName: Name);

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
     * Get the certificate of the default identity.
     * @return {IdentityCertificate} The requested certificate.  If not found,
     * return null.
     * @throws Error If getDefaultCertificatePromise doesn't return a SyncPromise
     * which is already fulfilled.
     */
    getDefaultCertificate(): IdentityCertificate;

    /*****************************************
     *            Delete Methods             *
     *****************************************/

    /**
     * Delete a certificate.
     * @param {Name} certificateName The certificate name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the certificate info is
     * deleted.
     */
    deleteCertificateInfoPromise(certificateName: Name, useSync?: boolean): Promise<any>;

    /**
     * Delete a certificate.
     * @param {Name} certificateName The certificate name.
     * @throws Error If deleteCertificateInfoPromise doesn't return a SyncPromise
     * which is already fulfilled.
     */
    deleteCertificateInfo(certificateName: Name);

    /**
     * Delete a public key and related certificates.
     * @param {Name} keyName The key name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the public key info is
     * deleted.
     */
    deletePublicKeyInfoPromise(keyName: Name, useSync?: boolean): Promise<any>;

    /**
     * Delete a public key and related certificates.
     * @param {Name} keyName The key name.
     * @throws Error If deletePublicKeyInfoPromise doesn't return a SyncPromise
     * which is already fulfilled.
     */
    deletePublicKeyInfo(keyName: Name);

    /**
     * Delete an identity and related public keys and certificates.
     * @param {Name} identityName The identity name.
     * @param {boolean} useSync (optional) If true then return a rejected promise
     * since this only supports async code.
     * @return {Promise} A promise which fulfills when the identity info is deleted.
     */
    deleteIdentityInfoPromise(identityName: Name, useSync?: boolean): Promise<any>;

    /**
     * Delete an identity and related public keys and certificates.
     * @param {Name} identityName The identity name.
     * @throws Error If deleteIdentityInfoPromise doesn't return a SyncPromise
     * which is already fulfilled.
     */
    deleteIdentityInfo(identityName: Name);
}