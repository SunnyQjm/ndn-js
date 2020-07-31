import {Name} from "../name";
import {PibIdentity} from "./pib";
import {PibKey} from "./pib";
import {ValidityPeriod} from "./validity-period";

export class SigningInfo {
    /**
     * SigningInfo holds the signing parameters passed to the KeyChain. A
     * SigningInfo is invalid if the specified identity/key/certificate does not
     * exist, or the PibIdentity or PibKey instance is not valid.
     *
     * The SigningInfo constructor has multiple forms:
     * SigningInfo() - Create a default SigningInfo with
     * SigningInfo.SignerType.NULL (which will cause KeyChain.sign to use the
     *   default identity) and an empty Name.
     * SigningInfo(signingInfo) - Create a SigningInfo as a copy of the given
     *   signingInfo (taking a pointer to the given signingInfo PibIdentity and
     *   PibKey without copying).
     * SigningInfo(signerType, signerName) - Create a SigningInfo with the
     * signerType and optional signer Name.
     * Signinginfo(identity) - Create a SigningInfo of type
     * SigningInfo.SignerType.ID according to the given PibIdentity, where the
     * digest algorithm is set to DigestAlgorithm.SHA256.
     * SigningInfo(key) - Create a SigningInfo of type SigningInfo.SignerType.KEY
     * according to the given PibKey, where the digest algorithm is set to
     * DigestAlgorithm.SHA256.
     * SigningInfo(signingString) - Create a SigningInfo from its string
     * representation, where the digest algorithm is set to DigestAlgorithm.SHA256.
     *
     * @param {SigningInfo} signingInfo The SigningInfo to copy.
     * @param {number} signerType The type of signer as an int from the
     * SigningInfo.SignerType enum.
     * @param {Name} signerName The name of signer. The interpretation of the
     * signerName differs based on the signerType. This copies the Name.
     * @param {PibIdentity} identity An existing PibIdentity which is not copied.
     * @param {PibKey} key An existing PibKey which is not copied.
     * @param {string} signingString The representative signing string for the
     * signing method, as follows:
     * Default signing: "" (the empty string).
     * Signing with the default certificate of the default key for the identity
     * with the specified name:
     * `id:/my-identity`.
     * Signing with the default certificate of the key with the specified name:
     * `key:/my-identity/ksk-1`.
     * Signing with the certificate with the specified name:
     * `cert:/my-identity/KEY/ksk-1/ID-CERT/%FD%01`.
     * Signing with sha256 digest: `id:/localhost/identity/digest-sha256` (the
     * value returned by getDigestSha256Identity()).
     * @throws Error If the signingString format is invalid.
     * @constructor
     */
    constructor(signerType: SigningInfo.SignerType, signerName: Name);
    constructor(arg?: SigningInfo | PibIdentity | PibKey | string);

    /**
     * Set this to type SignerType.ID and an identity with name identityName. This
     * does not change the digest algorithm.
     * @param {Name} identityName The name of the identity. This copies the Name.
     * @return {SigningInfo} This SigningInfo.
     */
    setSigningIdentity(identityName: Name): SigningInfo;

    /**
     * Set this to type SignerType.KEY and a key with name keyName. This does not
     * change the digest algorithm.
     * @param {Name} keyName The name of the key. This copies the Name.
     * @return {SigningInfo} This SigningInfo.
     */
    setSigningKeyName(keyName: Name): SigningInfo;

    /**
     * Set this to type SignerType.CERT and a certificate with name certificateName.
     * This does not change the digest algorithm.
     * @param {Name} certificateName The name of the certificate. This copies the
     * Name.
     * @return {SigningInfo} This SigningInfo.
     */
    setSigningCertificateName(certificateName: Name): SigningInfo;

    /**
     * Set this to type SignerType.SHA256, and set the digest algorithm to
     * DigestAlgorithm.SHA256.
     * @return {SigningInfo} This SigningInfo.
     */
    setSha256Signing(): SigningInfo;

    /**
     * Set this to type SignerType.ID according to the given PibIdentity. This does
     * not change the digest algorithm.
     * @param {PibIdentity} identity An existing PibIdentity which is not copied, or
     * null. If this is null then use the default identity, otherwise use
     * identity.getName().
     * @return {SigningInfo} This SigningInfo.
     */
    setPibIdentity(identity: PibIdentity): SigningInfo;

    /**
     * Set this to type SignerType.KEY according to the given PibKey. This does not
     * change the digest algorithm.
     * @param {PibKey} key An existing PibKey which is not copied, or null. If this
     * is null then use the default key for the identity, otherwise use
     * key.getName().
     * @return {SigningInfo} This SigningInfo.
     */
    setPibKey(key: PibKey): SigningInfo;

    /**
     * Get the type of the signer.
     * @return {number} The type of the signer, as an int from the
     * SigningInfo.SignerType enum.
     */
    getSignerType(): SigningInfo.SignerType;

    /**
     * Get the name of signer.
     * @return {Name} The name of signer. The interpretation differs based on the
     * signerType.
     */
    getSignerName(): Name;

    /**
     * Get the PibIdentity of the signer.
     * @return {PibIdentity} The PibIdentity handler of the signer, or null if
     * getSignerName() should be used to find the identity.
     * @throws Error if the signer type is not SignerType.ID.
     */
    getPibIdentity(): PibIdentity;

    /**
     * Get the PibKey of the signer.
     * @return {PibKey} The PibKey handler of the signer, or null if
     * getSignerName() should be used to find the key.
     * @throws Error if the signer type is not SignerType.KEY.
     */
    getPibKey(): PibKey;

    /**
     * Set the digest algorithm for public key operations.
     * @param {number} digestAlgorithm The digest algorithm, as an int from the
     * DigestAlgorithm enum.
     * @return {SigningInfo} This SigningInfo.
     */
    setDigestAlgorithm(digestAlgorithm: number): SigningInfo;

    /**
     * Get the digest algorithm for public key operations.
     * @return {number} The digest algorithm, as an int from the DigestAlgorithm
     * enum.
     */
    getDigestAlgorithm(): number;

    /**
     * Set the validity period for the signature info.
     * Note that the equivalent ndn-cxx method uses a semi-prepared SignatureInfo,
     * but this method only uses the ValidityPeriod from the SignatureInfo.
     * @param {ValidityPeriod} validityPeriod The validity period, which is copied.
     * @return {SigningInfo} This SigningInfo.
     */
    setValidityPeriod(validityPeriod: ValidityPeriod): SigningInfo;

    /**
     * Get the validity period for the signature info.
     * Note that the equivalent ndn-cxx method uses a semi-prepared SignatureInfo,
     * but this method only uses the ValidityPeriod from the SignatureInfo.
     * @return {ValidityPeriod} The validity period.
     */
    getValidityPeriod(): ValidityPeriod;

    /**
     * Get the string representation of this SigningInfo.
     * @return {string} The string representation.
     */
    toString(): string;

    /**
     * Get the localhost identity which indicates that the signature is generated
     * using SHA-256.
     * @return {Name} A new Name of the SHA-256 identity.
     */
    static getDigestSha256Identity(): Name;

    /**
     * Check and set the signerType, and set others to default values. This does NOT
     * reset the digest algorithm.
     * @param {number} signerType The type of signer as an int from the
     * SigningInfo.SignerType enum.
     */
    reset(signerType: SigningInfo.SignerType): void;
}

export namespace SigningInfo {
    enum SignerType {
        NULL = 0,
        ID = 1,
        KEY = 2,
        CERT = 3,
        SHA256 = 4,
    }
}