import {Tlv0_2WireFormat} from "./tlv-0_2-wire-format";

/**
 * A Tlv0_1_1WireFormat extends Tlv0_2WireFormat so that it is an alias in case
 * any applications use Tlv0_1_1WireFormat directly.  These two wire formats are
 * the same except that Tlv0_2WireFormat adds support for the name component
 * type ImplicitSha256Digest.
 * @constructor
 */
export class Tlv0_1_1WireFormat extends Tlv0_2WireFormat {
    /**
     * Get a singleton instance of a Tlv0_1_1WireFormat.
     * @return {Tlv0_1_1WireFormat} The singleton instance.
     */
    static get(): Tlv0_1_1WireFormat;
}