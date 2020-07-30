import {Name} from "../../name";
import {PibImpl} from "./pib-impl";
import {SyncPromise} from "../../util";
import {CertificateV2} from "../v2/certificate-v2";

export class PibCertificateContainer {
    /**
     * A PibCertificateContainer is used to search/enumerate the certificates of a
     * key. (A PibCertificateContainer object can only be created by PibKey.)
     *
     * You should not call this private constructor. Instead, use
     * PibCertificateContainer.makePromise().
     *
     * @param {Name} keyName The name of the key, which is copied.
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @param {Array<Name>} certificateNames The set of certificate
     * names as an array of Name, as returned by getCertificatesOfKeyPromise.
     * @constructor
     */
    constructor(keyName: Name, pibImpl: PibImpl, certificateNames: Name[]);

    /**
     * Create a PibCertificateContainer for a key with keyName.
     * This method that returns a Promise is needed instead of a normal constructor
     * since it uses asynchronous PibImpl methods to initialize the object.
     * This method should only be called by PibKeyImpl.
     *
     * @param {Name} keyName The name of the key, which is copied.
     * @param {PibImpl} pibImpl The PIB backend implementation.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @param {Promise|SyncPromise} A promise which returns the new
     * PibCertificateContainer.
     */
    static makePromise(keyName: Name, pibImpl: PibImpl, useSync?: boolean): Promise<PibCertificateContainer> | SyncPromise;

    /**
     * Get the number of certificates in the container.
     * @return {number} The number of certificates.
     */
    size(): number;

    /**
     * Add certificate into the container. If the certificate already exists, this
     * replaces it.
     * @param {CertificateV2} certificate The certificate to add. This copies the
     * object.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with Error if the name of the certificate does not match the
     * key name.
     */
    addPromise(certificate: CertificateV2, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Remove the certificate with name certificateName from the container. If the
     * certificate does not exist, do nothing.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when finished, or a
     * promise rejected with Error if certificateName does not match the key name.
     */
    removePromise(certificateName: CertificateV2, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Get the certificate with certificateName from the container.
     * @param {Name} certificateName The name of the certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {SyncPromise} A promise which returns a copy of the CertificateV2, or
     * a promise rejected with Error if certificateName does not match the key name,
     * or a promise rejected with Pib.Error if the certificate does not exist.
     */
    getPromise(certificateName: CertificateV2, useSync?: boolean): SyncPromise;
}