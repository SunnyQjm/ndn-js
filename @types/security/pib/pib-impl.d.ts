import {Blob, SyncPromise} from "../../util";
import {Name} from "../../name";
import {CertificateV2} from "../v2/certificate-v2";

export class PibImpl {
    /**
     * PibImpl is an abstract base class for the PIB implementation used by the Pib
     * class. This class defines the interface that an actual PIB implementation
     * should provide, for example PibMemory.
     * @constructor
     */
    constructor();

    /**
     * Set the corresponding TPM information to tpmLocator. This method does not
     * reset the contents of the PIB.
     * @param {string} tpmLocator The TPM locator string.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the TPM locator is set.
     */
    setTpmLocatorPromise(tpmLocator: string, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the TPM Locator.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the TPM locator string.
     */
    getTpmLocatorPromise(useSync?: boolean): Promise<string> | SyncPromise;

    /**
     * Check for the existence of an identity.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if the identity exists,
     * otherwise false.
     */
    hasIdentityPromise(identityName: Name, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Add the identity. If the identity already exists, do nothing. If no default
     * identity has been set, set the added identity as the default.
     * @param {Name} identityName The name of the identity to add. This copies the
     * name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the identity is added.
     */
    addIdentityPromise(identityName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Remove the identity and its related keys and certificates. If the default
     * identity is being removed, no default identity will be selected. If the
     * identity does not exist, do nothing.
     * @param {Name} identityName The name of the identity to remove.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the identity is removed.
     */
    removeIdentityPromise(identityName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Erase all certificates, keys, and identities.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the identities are cleared.
     */
    clearIdentitiesPromise(useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the names of all the identities.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a fresh set of identity names
     * as an array of Name. The Name objects are fresh copies.
     */
    getIdentitiesPromise(useSync?: boolean): Promise<Name[]> | SyncPromise;

    /**
     * Set the identity with the identityName as the default identity. If the
     * identity with identityName does not exist, then it will be created.
     * @param {Name} identityName The name for the default identity. This copies the
     * name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the default identity is
     * set.
     */
    setDefaultIdentityPromise(identityName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the default identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the Name of the default
     * identity as a fresh copy, or a promise rejected with Pib.Error for no default
     * identity.
     */
    getDefaultIdentityPromise(useSync?: boolean): Promise<Name> | SyncPromise;

    // Key management.

    /**
     * Check for the existence of a key with keyName.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if the key exists,
     * otherwise false. Return false if the identity does not exist.
     */
    hasKeyPromise(keyName: Name, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Add the key. If a key with the same name already exists, overwrite the key.
     * If the identity does not exist, it will be created. If no default key for the
     * identity has been set, then set the added key as the default for the
     * identity. If no default identity has been set, identity becomes the default.
     * @param {Name} identityName The name of the identity that the key belongs to.
     * This copies the name.
     * @param {Name} keyName The name of the key. This copies the name.
     * @param {Buffer} key The public key bits. This copies the array.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the key is added.
     */
    addKeyPromise(identityName: Name, keyName: Name, key: boolean, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Remove the key with keyName and its related certificates. If the key does not
     * exist, do nothing.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the key is removed.
     */
    removeKeyPromise(keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the key bits of a key with name keyName.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the key bits as a Blob, or a
     * promise rejected with Pib.Error if the key does not exist.
     */
    getKeyBitsPromise(keyName: Name, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Get all the key names of the identity with the name identityName. The
     * returned key names can be used to create a KeyContainer. With a key name and
     * a backend implementation, one can create a Key front end instance.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return SyncPromise} A promise which returns the set of key names as an array
     * of Name. The Name objects are fresh copies. If the identity does not exist,
     * return an empty array.
     */
    getKeysOfIdentityPromise(identityName: Name, useSync?: boolean): Promise<Name[]> | SyncPromise;

    /**
     * Set the key with keyName as the default key for the identity with name
     * identityName.
     * @param {Name} identityName The name of the identity. This copies the name.
     * @param {Name} keyName The name of the key. This copies the name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the default key is set,
     * or a promise rejected with Pib.Error if the key does not exist.
     */
    setDefaultKeyOfIdentityPromise(identityName: Name, keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the name of the default key for the identity with name identityName.
     * @param {Name} identityName The name of the identity.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the name of the default key as
     * a fresh copy, or a promise rejected with Pib.Error if the identity does not
     * exist.
     */
    getDefaultKeyOfIdentityPromise(identityName: Name, useSync?: boolean): Promise<Name> | SyncPromise;

    /**
     * Check for the existence of a certificate with name certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if the certificate exists,
     * otherwise false.
     */
    hasCertificatePromise(certificateName: Name, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Add the certificate. If a certificate with the same name (without implicit
     * digest) already exists, then overwrite the certificate. If the key or
     * identity does not exist, they will be created. If no default certificate for
     * the key has been set, then set the added certificate as the default for the
     * key. If no default key was set for the identity, it will be set as the
     * default key for the identity. If no default identity was selected, the
     * certificate's identity becomes the default.
     * @param {CertificateV2} certificate The certificate to add. This copies the
     * object.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the certificate is added.
     */
    addCertificatePromise(certificate: CertificateV2, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Remove the certificate with name certificateName. If the certificate does not
     * exist, do nothing.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the certificate is
     * removed.
     */
    removeCertificatePromise(certificateName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the certificate with name certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the CertificateV2, or a promise
     * rejected with Pib.Error if the certificate does not exist.
     */
    getCertificatePromise(certificateName: Name, useSync?: boolean): Promise<CertificateV2> | SyncPromise;

    /**
     * Get a list of certificate names of the key with id keyName. The returned
     * certificate names can be used to create a PibCertificateContainer. With a
     * certificate name and a backend implementation, one can obtain the certificate.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the set of certificate names as
     * an array of Name. The Name objects are fresh copies. If the key does not
     * exist, return an empty array.
     */
    getCertificatesOfKeyPromise(keyName: Name, useSync?: boolean): Promise<Name[]> | SyncPromise;

    /**
     * Set the cert with name certificateName as the default for the key with
     * keyName.
     * @param {Name} keyName The name of the key.
     * @param {Name} certificateName The name of the certificate. This copies the
     * name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the default certificate
     * is set, or a promise rejected with Pib.Error if the certificate with name
     * certificateName does not exist.
     */
    setDefaultCertificateOfKeyPromise(keyName: Name, certificateName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the default certificate for the key with eyName.
     * @param {Name} keyName The name of the key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a copy of the default
     * CertificateV2, or a promise rejected with Pib.Error if the default
     * certificate does not exist.
     */
    getDefaultCertificateOfKeyPromise(keyName: Name, useSync?: boolean): Promise<CertificateV2> | SyncPromise;
}

export namespace PibImpl {
    class Error {
        /**
         * Create a PibImpl.Error which represents a non-semantic error in PIB
         * implementation processing. A subclass of PibImpl may throw a subclass of this
         * class when there's a non-semantic error, such as a storage problem.
         * Call with: throw new PibImpl.Error(new Error("message")).
         * @constructor
         * @param {Error} error The exception created with new Error.
         */
        constructor(error: Error);
    }
}