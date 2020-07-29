import {Blob} from "../util";

export class LpPacket {
    /**
     * An LpPacket represents an NDNLPv2 packet including header fields an an
     * optional fragment. This is an internal class which the application normally
     * would not use.
     * http://redmine.named-data.net/projects/nfd/wiki/NDNLPv2
     * @constructor
     */
    constructor();

    /**
     * Get the fragment wire encoding.
     * @return {Blob} The wire encoding, or an isNull Blob if not specified.
     */
    getFragmentWireEncoding(): Blob;

    /**
     * Get the number of header fields. This does not include the fragment.
     * @return {number} The number of header fields.
     */
    countHeaderFields(): number;

    /**
     * Get the header field at the given index.
     * @param {number} index The index, starting from 0. It is an error if index is
     * greater to or equal to countHeaderFields().
     * @return {object} The header field at the index.
     */
    getHeaderField(index: number): any;

    /**
     * Remove all header fields and set the fragment to an isNull Blob.
     */
    clear(): void;

    /**
     * Set the fragment wire encoding.
     * @param {Blob} fragmentWireEncoding The fragment wire encoding or an isNull
     * Blob if not specified.
     */
    setFragmentWireEncoding(fragmentWireEncoding: Blob): void;

    /**
     * Add a header field. To add the fragment, use setFragmentWireEncoding().
     * @param {object} headerField The header field to add.
     */
    addHeaderField(headerField: any): void;
}