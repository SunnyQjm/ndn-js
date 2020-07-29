import {LpPacket} from "./lp-packet";

export class IncomingFaceId {
    /**
     * IncomingFaceId represents the incoming face ID header field in an NDNLPv2 packet.
     * http://redmine.named-data.net/projects/nfd/wiki/NDNLPv2
     * @constructor
     */
    constructor();

    /**
     * Get the incoming face ID value.
     * @return {number} The face ID value.
     */
    getFaceId(): number;

    /**
     * Set the face ID value.
     * @param {number} faceId The incoming face ID value.
     */
    setFaceId(faceId: number);

    /**
     * Get the first header field in lpPacket which is an IncomingFaceId. This is
     * an internal method which the application normally would not use.
     * @param {LpPacket} lpPacket The LpPacket with the header fields to search.
     * @return {IncomingFaceId} The first IncomingFaceId header field, or null if
     * not found.
     */
    static getFirstHeader(lpPacket: LpPacket): IncomingFaceId;
}