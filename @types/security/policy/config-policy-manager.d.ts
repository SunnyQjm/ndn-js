import {CertificateCache} from "./certificate-cache";
import {CertificateCacheV2} from "../v2/certificate-cache-v2";
import {Name} from "../../name";
import {BoostInfoTree} from "../../util/boost-info-parser";
import {IdentityCertificate} from "../certificate";
import {CertificateV2} from "../v2/certificate-v2";
import {Data} from "../../data";
import {Interest} from "../../interest";
import {WireFormat} from "../../encoding";
import {Signature} from "../../signature";
import {SignedBlob} from "../../util";
import {PolicyManager} from "./policy-manager";

export class ConfigPolicyManager extends PolicyManager {
    /**
     * ConfigPolicyManager manages trust according to a configuration file in the
     * Validator Configuration File Format
     * (http://redmine.named-data.net/projects/ndn-cxx/wiki/CommandValidatorConf)
     *
     * Once a rule is matched, the ConfigPolicyManager looks in the
     * certificate cache for the certificate matching the name in the KeyLocator
     * and uses its public key to verify the data packet or signed interest. If the
     * certificate can't be found, it is downloaded, verified and installed. A chain
     * of certificates will be followed to a maximum depth.
     * If the new certificate is accepted, it is used to complete the verification.
     *
     * The KeyLocators of data packets and signed interests MUST contain a name for
     * verification to succeed.
     *
     * Create a new ConfigPolicyManager which will act on the rules specified in the
     * configuration and download unknown certificates when necessary. If
     * certificateCache is a CertificateCache (or omitted) this creates a security
     * v1 PolicyManager to verify certificates in format v1. To verify certificates
     * in format v2, use a CertificateCacheV2 for the certificateCache.
     *
     * @param {string} configFileName (optional) If not null or empty, the path to
     * the configuration file containing verification rules. (This only works in
     * Node.js since it reads files using the "fs" module.) Otherwise, you should
     * separately call load().
     * @param {CertificateCache|CertificateCacheV2} certificateCache (optional) A
     * CertificateCache to hold known certificates. If certificateCache is a
     * CertificateCache (or omitted or null) this creates a security v1
     * PolicyManager to verify certificates in format v1. If this is a
     * CertificateCacheV2, verify certificates in format v1. If omitted or null,
     * create an internal v1 CertificateCache.
     * @param {number} searchDepth (optional) The maximum number of links to follow
     * when verifying a certificate chain. If omitted, use a default.
     * @param {number} graceInterval (optional) The window of time difference
     * (in milliseconds) allowed between the timestamp of the first interest signed with
     * a new public key and the validation time. If omitted, use a default value.
     * @param {number} keyTimestampTtl (optional) How long a public key's last-used
     * timestamp is kept in the store (milliseconds). If omitted, use a default value.
     * @param {number} maxTrackedKeys The maximum number of public key use
     * timestamps to track. If omitted, use a default.
     * @constructor
     */
    constructor(configFileName?: string, certificateCache?: CertificateCache | CertificateCacheV2, searchDepth?: number,
                graceInterval?: number, keyTimestampTtl?: number, maxTrackedKeys?: number);

    /**
     * Reset the certificate cache and other fields to the constructor state.
     */
    reset();

    /**
     * Call reset() and load the configuration rules from the file name or the input
     * string. There are two forms:
     * load(configFileName) reads configFileName from the file system. (This only
     * works in Node.js since it reads files using the "fs" module.)
     * load(input, inputName) reads from the input, in which case inputName is used
     * only for log messages, etc.
     * @param {string} configFileName The path to the file containing configuration
     * rules.
     * @param {string} input The contents of the configuration rules, with lines
     * separated by "\n" or "\r\n".
     * @param {string} inputName Use with input for log messages, etc.
     */
    load(configFileNameOrInput: string, inputName: string);

    /**
     * The configuration file allows 'trust anchor' certificates to be preloaded.
     * The certificates may also be loaded from a directory, and if the 'refresh'
     * option is set to an interval, the certificates are reloaded at the specified
     * interval.
     */
    loadTrustAnchorCertificates();

    /**
     * Once a rule is found to match data or a signed interest, the name in the
     * KeyLocator must satisfy the condition in the 'checker' section of the rule,
     * else the data or interest is rejected.
     * @param {Name} signatureName The certificate name from the KeyLocator.
     * @param {Name} objectName The name of the data packet or interest. In the case
     * of signed interests, this excludes the timestamp, nonce and signature
     * components.
     * @param {BoostInfoTree} rule The rule from the configuration file that matches
     * the data or interest.
     * @param {Array<string>} failureReason If matching fails, set failureReason[0]
     * to the failure reason.
     * @return {boolean} True if matches.
     */
    checkSignatureMatch(signatureName: Name, objectName: Name, rule: BoostInfoTree, failureReason: string[]): boolean;

    /**
     * This looks up certificates specified as base64-encoded data or file names.
     * These are cached by filename or encoding to avoid repeated reading of files
     * or decoding.
     * @param {string} certID
     * @param {boolean} isPath
     * @return {IdentityCertificate} The certificate object, or null if not found.
     */
    lookupCertificate(certID: string, isPath: boolean): IdentityCertificate;

    /**
     * This looks up certificates specified as base64-encoded data or file names.
     * These are cached by filename or encoding to avoid repeated reading of files
     * or decoding.
     * @param {string} certID
     * @param {boolean} isPath
     * @return {CertificateV2} The certificate object, or null if not found.
     */
    lookupCertificateV2(certID: string, isPath: boolean): CertificateV2;

    /**
     * Search the configuration file for the first rule that matches the data or
     * signed interest name. In the case of interests, the name to match should
     * exclude the timestamp, nonce, and signature components.
     * @param {Name} objName The name to be matched.
     * @param {string} matchType The rule type to match, "data" or "interest".
     * @return {BoostInfoTree} The matching rule, or null if not found.
     */
    findMatchingRule(objName: Name, matchType: string): BoostInfoTree;

    /**
     * Determines if a name satisfies the relation to matchName.
     * @param {Name} name
     * @param {Name} matchName
     * @param {string} matchRelation Can be one of:
     *   'is-prefix-of' - passes if the name is equal to or has the other
     *      name as a prefix
     *   'is-strict-prefix-of' - passes if the name has the other name as a
     *      prefix, and is not equal
     *   'equal' - passes if the two names are equal
     * @return {boolean}
     */
    matchesRelation(name: Name, matchName: Name, matchRelation: string): boolean;

    /**
     * Extract the signature information from the interest name or from the data
     * packet or interest.
     * @param {Data|Interest} dataOrInterest The object whose signature is needed.
     * @param {WireFormat} wireFormat (optional) The wire format used to decode
     * signature information from the interest name.
     * @return {Signature} The object of a sublcass of Signature or null if can't
     * decode.
     */
    extractSignature(dataOrInterest: Data | Interest, wireFormat: WireFormat): Signature;

    /**
     * Determine whether the timestamp from the interest is newer than the last use
     * of this key, or within the grace interval on first use.
     * @param {Name} keyName The name of the public key used to sign the interest.
     * @param {number} timestamp The timestamp extracted from the interest name.
     * @param {Array<string>} failureReason If matching fails, set failureReason[0]
     * to the failure reason.
     * @return {boolean} True if timestamp is fresh as described above.
     */
    interestTimestampIsFresh(keyName: Name, timestamp: number, failureReason: string[]): boolean;

    /**
     * Trim the table size down if necessary, and insert/update the latest interest
     * signing timestamp for the key. Any key which has not been used within the TTL
     * period is purged. If the table is still too large, the oldest key is purged.
     * @param {Name} keyName The name of the public key used to sign the interest.
     * @param {number} timestamp The timestamp extracted from the interest name.
     */
    updateTimestampForKey(keyName: Name, timestamp: number);

    /**
     * Check the type of signatureInfo to get the KeyLocator. Look in the
     * IdentityStorage for the public key with the name in the KeyLocator and use it
     * to verify the signedBlob. If the public key can't be found, return false.
     * (This is a generalized method which can verify both a data packet and an
     * interest.)
     * @param {Signature} signatureInfo An object of a subclass of Signature, e.g.
     * Sha256WithRsaSignature.
     * @param {SignedBlob} signedBlob The SignedBlob with the signed portion to
     * verify.
     * @param {function} onComplete This calls onComplete(true, undefined) if the
     * signature verifies, otherwise onComplete(false, reason).
     */
    verify(signatureInfo: Signature, signedBlob: SignedBlob, onComplete: (verifies: boolean, reason: any) => any);
}

export namespace ConfigPolicyManager {
    class TrustAnchorRefreshManager {
        /**
         * Manages the trust-anchor certificates, including refresh.
         * @constructor
         */
        constructor(isSecurityV1: boolean);

        /**
         * @param {string} fileName
         * @return {IdentityCertificate}
         */
        static loadIdentityCertificateFromFile(fileName: string): IdentityCertificate;

        /**
         * @param {string} fileName
         * @return {CertificateV2}
         */
        static loadCertificateV2FromFile(fileName: string): CertificateV2;

        /**
         * @param {Name} certificateName
         * @return {IdentityCertificate}
         */
        getCertificate(certificateName: Name): IdentityCertificate;

        /**
         * @param {Name} certificateName
         * @return {CertificateV2}
         */
        getCertificateV2(certificateName: Name): CertificateV2;

        addDirectory(directoryName: string, refreshPeriod: number);

        refreshAnchors();


    }
}