/**
 * A Tlv0_1WireFormat extends Tlv0_1_1WireFormat so that it is an alias in case
 * any applications use Tlv0_1WireFormat directly.  These two wire formats are
 * the same except that Tlv0_1_1WireFormat adds support for
 * Sha256WithEcdsaSignature.
 * @constructor
 */
import {Tlv0_1_1WireFormat} from "./tlv-0_1_1-wire-format";

export class Tlv0_1WireFormat extends Tlv0_1_1WireFormat {
    /**
     * Get a singleton instance of a Tlv0_1WireFormat.
     * @return {Tlv0_1WireFormat} The singleton instance.
     */
    static get(): Tlv0_1WireFormat;
}