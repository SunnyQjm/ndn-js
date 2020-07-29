import {LpPacket} from "./lp-packet";

export class CongestionMark {
    /**
     * CongestionMark represents the congestion mark header field in an NDNLPv2
     * packet.
     * http://redmine.named-data.net/projects/nfd/wiki/NDNLPv2
     * @constructor
     */
    constructor();

    /**
     * Get the congestion mark value.
     * @return {number} The congestion mark value.
     */
    getCongestionMark(): number;

    /**
     * Set the congestion mark value.
     * @param {number} congestionMark The congestion mark ID value.
     */
    setCongestionMark(congestionMark: number);

    /**
     * Get the first header field in lpPacket which is a CongestionMark. This is
     * an internal method which the application normally would not use.
     * @param {LpPacket} lpPacket The LpPacket with the header fields to search.
     * @return {CongestionMark} The first CongestionMark header field, or null if
     * not found.
     */
    static getFirstHeader(lpPacket: LpPacket): CongestionMark;
}