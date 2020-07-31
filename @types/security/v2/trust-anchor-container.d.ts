import {CertificateV2} from "./certificate-v2";
import {Name} from "../../name";
import {Interest} from "../../interest";
import {TrustAnchorGroup} from "./trust-anchor-group";

export class TrustAnchorContainer {
    /**
     * A TrustAnchorContainer represents a container for trust anchors.
     *
     * There are two kinds of anchors:
     * static anchors that are permanent for the lifetime of the container, and
     * dynamic anchors that are periodically updated.
     *
     * Trust anchors are organized in groups. Each group has a unique group id.
     * The same anchor certificate (same name without considering the implicit
     * digest) can be inserted into multiple groups, but no more than once into each.
     *
     * Dynamic groups are created using the appropriate TrustAnchorContainer.insert
     * method. Once created, the dynamic anchor group cannot be updated.
     *
     * The returned pointer to Certificate from `find` methods is only guaranteed to
     * be valid until the next invocation of `find` and may be invalidated
     * afterwards.
     *
     * Create an empty TrustAnchorContainer.
     * @constructor
     */
    constructor();

    /**
     * There are two forms of insert:
     * insert(groupId, certificate) - Insert a static trust anchor. If the
     * certificate (having the same name without considering implicit digest)
     * already exists in the group with groupId, then do nothing.
     * insert(groupId, path, refreshPeriod, isDirectory) - Insert dynamic trust
     * anchors from the path.
     * @param {String} groupId The certificate group id.
     * @param {CertificateV2} certificate The certificate to insert, which is copied.
     * @param {String} path The path to load the trust anchors.
     * @param {number} refreshPeriod  The refresh time in milliseconds for the
     * anchors under path. This must be positive. The relevant trust anchors will
     * only be updated when find is called.
     * @param {boolean} isDirectory (optional) If true, then path is a directory. If
     * false or omitted, it is a single file.
     * @throws TrustAnchorContainer.Error If inserting a static trust anchor and
     * groupId is for a dynamic anchor group , or if inserting a dynamic trust
     * anchor and a group with groupId already exists.
     * @throws Error If refreshPeriod is not positive.
     */
    insert(groupId: string, certificateOrPath: CertificateV2 | string, refreshPeriod: number, isDirectory: boolean);

    /**
     * Remove all static and dynamic anchors.
     */
    clear();

    /**
     * There are two forms of find:
     * find(keyName) - Search for a certificate across all groups (longest prefix
     * match).
     * find(interest) - Find a certificate for the given interest. Note: Interests
     * with implicit digest are not supported.
     * @param {Name} keyName The key name prefix for searching for the certificate.
     * @param {Interest} interest The input interest packet.
     * @return {CertificateV2} The found certificate, or null if not found.
     */
    find(keyNameOrInterest: Name | Interest): CertificateV2;

    /**
     * Get the trust anchor group for the groupId.
     * @param {String} groupId The group ID.
     * @return {TrustAnchorGroup} The trust anchor group.
     * @throws TrustAnchorContainer.Error if the groupId does not exist.
     */
    getGroup(groupId: string): TrustAnchorGroup;

    /**
     * Get the number of trust anchors across all groups.
     * @return {number} The number of trust anchors.
     */
    size(): number;
}

export namespace TrustAnchorContainer {
    class TrustAnchorContainerError {
        constructor(error: any);
    }

    type Error = TrustAnchorContainerError;
}