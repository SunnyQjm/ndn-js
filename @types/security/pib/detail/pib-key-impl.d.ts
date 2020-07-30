import {Name} from "../../../name";
import {PibImpl} from "../pib-impl";
import {Blob, SyncPromise} from "../../../util";
import {CertificateV2} from "../../v2/certificate-v2";

export class PibKeyImpl {
    /**
     * A PibKeyImpl provides the backend implementation for PibKey. A PibKey has
     * only one backend instance, but may have multiple frontend handles. Each
     * frontend handle is associated with the only one backend PibKeyImpl.
     *
     * You should not call this private constructor. Instead, use
     * PibKeyImpl.makePromise().
     *
     * @constructor
     */
    constructor();

    /**
     * Create a PibKeyImpl. This method has two forms:
     * PibKeyImpl(keyName, keyEncoding, pibImpl, useSync) - Create a PibKeyImpl with
     * keyName. If the key does not exist in the backend implementation, add it by
     * creating it from the keyEncoding. If a key with keyName already exists,
     * overwrite it.
     * PibKeyImpl(keyName, pibImpl, useSync) - Create a PibKeyImpl with keyName.
     * Initialize the cached key encoding with pibImpl.getKeyBits().
     * This method that returns a Promise is needed instead of a normal constructor
     * since it uses asynchronous PibImpl methods to initialize the object.
     *
     * @param {Name} keyName The name of the key, which is copied.
     * @param {Buffer} keyEncoding The buffer of encoded key bytes, which is copied.
     * (This is only used in the constructor form
     * PibKeyImpl(keyName, keyEncoding, pibImpl) .)
     * @param {PibImpl) pibImpl: The Pib backend implementation.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @param {Promise|SyncPromise} A promise which returns the new PibKeyImpl, or a
     * promise which is rejected with Pib.Error if the constructor is the form
     * PibKeyImpl(keyName, pibImpl) (without the keyEncoding) and the key with
     * keyName does not exist.
     */
    static makePromise(keyName: Name, arg2: Buffer | PibImpl, arg3?: PibImpl | boolean, arg4?: boolean): Promise<PibKeyImpl> | SyncPromise;

    /**
     * Get the key name.
     * @return {Name} The key name. You must not change the object. If you need to
     * change it, make a copy.
     */
    getName(): Name;

    /**
     * Get the name of the identity this key belongs to.
     * @return {Name} The name of the identity. You must not change the object. If
     * you need to change it, make a copy.
     */
    getIdentityName(): Name;

    /**
     * Get the key type.
     * @return {number} The key type as an int from the KeyType enum.
     */
    getKeyType(): number;

    /**
     * Get the public key encoding.
     * @return {Blob} The public key encoding.
     */
    getPublicKey(): Blob;

    /**
     * Add the certificate. If a certificate with the same name (without implicit
     * digest) already exists, then overwrite the certificate. If no default
     * certificate for the key has been set, then set the added certificate as
     * default for the key.
     * @param {CertificateV2} certificate The certificate to add. This copies
     * the object.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with Error if the name of the certificate does not match the
     * key name.
     */
    addCertificatePromise(certificate: CertificateV2, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Remove the certificate with name certificateName. If the certificate does not
     * exist, do nothing.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with Error if certificateName does not match the key name.
     */
    removeCertificatePromise(certificateName: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the certificate with name certificateName.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns a copy of the
     * CertificateV2, or a promise rejected with Error if certificateName does not
     * match the key name, or a promise rejected with Pib.Error if the certificate
     * does not exist.
     */
    getCertificatePromise(certificateName: Name, useSync?: boolean): Promise<CertificateV2> | SyncPromise;

    /**
     * Set the existing certificate as the default certificate.
     * @param {Name|CertificateV2} certificateOrCertificateName If
     * certificateOrCertificateName is a Name, it is the name of the certificate,
     * which must exist. Otherwise certificateOrCertificateName is the CertificateV2
     * to add (if necessary) and set as the default.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the default
     * CertificateV2, or a promise rejected with Error if certificateName does not
     * match the key name, or a promise rejected with Pib.Error if
     * certificateOrCertificateName is the certificate Name and the certificate does
     * not exist.
     */
    setDefaultCertificatePromise(certificateOrCertificateName: Name | CertificateV2, useSync?: boolean): Promise<CertificateV2> | SyncPromise;

    /**
     * Get the default certificate for this Key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns the default
     * CertificateV2, or a promise rejected with Pib.Error if the default
     * certificate does not exist.
     */
    getDefaultCertificatePromise(useSync?: boolean): Promise<CertificateV2> | SyncPromise;
}