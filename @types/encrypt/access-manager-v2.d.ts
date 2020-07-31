/**
 * AccessManagerV2 controls the decryption policy by publishing granular
 * per-namespace access policies in the form of key encryption
 * (KEK, plaintext public) and key decryption (KDK, encrypted private key)
 * key pairs. This works with EncryptorV2 and DecryptorV2 using security v2.
 * For the meaning of "KDK", etc. see:
 * https://github.com/named-data/name-based-access-control/blob/new/docs/spec.rst
 *
 * Create an AccessManagerV2 to serve the NAC public key for other data
 * producers to fetch, and to serve encrypted versions of the private keys
 * (as safe bags) for authorized consumers to fetch.
 *
 * KEK and KDK naming:
 *
 * [identity]/NAC/[dataset]/KEK            /[key-id]                           (== KEK, public key)
 *
 * [identity]/NAC/[dataset]/KDK/[key-id]   /ENCRYPTED-BY/[user]/KEY/[key-id]   (== KDK, encrypted private key)
 *
 * \_____________  ______________/
 *               \/
 *      registered with NFD
 *
 * @param {PibIdentity} identity The data owner's namespace identity. (This will
 * be used to sign the KEK and KDK.)
 * @param {Name} dataset The name of dataset that this manager is controlling.
 * @param {KeyChain} keyChain The KeyChain used to sign Data packets.
 * @param {Face} face The Face for calling registerPrefix that will be used to
 * publish the KEK and KDK Data packets.
 * @constructor
 */
import {PibIdentity} from "../security/pib/pib-identity";
import {Name} from "../name";
import {KeyChain} from "../security/key-chain";
import {Face} from "../face";
import {CertificateV2} from "../security/v2/certificate-v2";
import {Data} from "../data";

export class AccessManagerV2 {
    static DEFAULT_KEK_FRESHNESS_PERIOD_MS: number;
    static DEFAULT_KDK_FRESHNESS_PERIOD_MS: number;

    constructor(identity: PibIdentity, dataset: Name, keyChain: KeyChain, face: Face);

    shutdown(): void;

    /**
     * Authorize a member identified by memberCertificate to decrypt data under
     * the policy.
     * @param {CertificateV2} memberCertificate The certificate that identifies the
     * member to authorize.
     * @return {Data} The published KDK Data packet.
     */
    addMember(memberCertificate: CertificateV2): Data;

    /**
     * Get the number of packets stored in in-memory storage.
     * @return {number} The number of packets.
     */
    size(): number;
}