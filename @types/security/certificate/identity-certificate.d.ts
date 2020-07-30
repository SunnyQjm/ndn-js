import {Data} from "../../data";
import {Name} from "../../name";
import {Blob} from "../../util";
import {WireFormat} from "../../encoding";

export class IdentityCertificate {
    /**
     * @constructor
     */
    constructor(data: Data | IdentityCertificate);

    /**
     * Override the base class method to check that the name is a valid identity
     * certificate name.
     * @param {Name} name The identity certificate name which is copied.
     * @return {Data} This Data so that you can chain calls to update values.
     */
    setName(name: Name): Data;

    /**
     * Override to call the base class wireDecode then update the public key name.
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to decode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     */
    wireDecode(input: Blob | Buffer, wireFormat: WireFormat);

    getPublicKeyName(): Name;

    /**
     * Get the public key name from the full certificate name.
     * @param {Name} certificateName The full certificate name.
     * @return {Name} The related public key name.
     */
    static certificateNameToPublicKeyName(certificateName: Name): Name;

    isCorrectName(name: Name): boolean;

    setPublicKeyName();
}
