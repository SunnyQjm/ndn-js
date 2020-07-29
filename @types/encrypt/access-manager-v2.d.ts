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
export class AccessManagerV2 {

}