import {
    Blob,
    DynamicBuffer
} from '../../util';
import {
    DerDecodingException
} from './der-decoding-exception';
import {
    DerEncodingException
} from './der-encoding-exception';
import {
    DerNodeType
} from './der-node-type';

/**
 * A DerStructure extends DerNode to hold other DerNodes.
 * Create a DerStructure with the given nodeType. This is a private
 * constructor. To create an object, use DerSequence.
 * @param {number} nodeType One of the defined DER DerNodeType constants.
 */
export class DerStructure extends DerNode {
    /**
     * Get the total length of the encoding, including children.
     * @return {number} The total (header + payload) length.
     */
    getSize(): number;

    /**
     * Get the children of this node.
     * @return {Array<DerNode>} The children as an array of DerNode.
     */
    getChildren(): DerNode[];

    updateSize(): void;

    /**
     * Add a child to this node.
     * @param {DerNode} node The child node to add.
     * @param {boolean} notifyParent (optional) Set to true to cause any containing
     * nodes to update their size.  If omitted, use false.
     */
    addChild(node: DerNode, notifyParent?: boolean);

    /**
     * Mark the child list as dirty, so that we update size when necessary.
     */
    setChildChanged(): void;

    /**
     * Override the base encode to return raw data encoding for this node and its
     * children.
     * @return {Blob} The raw data encoding.
     */
    encode(): Blob;

    /**
     * Override the base decode to decode and store the data from an input
     * buffer. Recursively populates child nodes.
     * @param {Buffer} inputBuf The input buffer to read from.
     * @param {number} startIdx The offset into the buffer.
     */
    decode(inputBuf: Buffer, startIdx: number);
}

////////
// Now for all the node types...
////////

/**
 * A DerByteString extends DerNode to handle byte strings.
 * Create a DerByteString with the given inputData and nodeType. This is a
 * private constructor used by one of the public subclasses such as
 * DerOctetString or DerPrintableString.
 * @param {Buffer} inputData An input buffer containing the string to encode.
 * @param {number} nodeType One of the defined DER DerNodeType constants.
 */
export class DerByteString extends DerNode {
    /**
     * Get the total length of the encoding, including children.
     * @return {number} The total (header + payload) length.
     */
    getSize(): number;

    /**
     * Get the children of this node.
     * @return {Array<DerNode>} The children as an array of DerNode.
     */
    getChildren(): DerNode[];

    updateSize(): void;

    /**
     * Add a child to this node.
     * @param {DerNode} node The child node to add.
     * @param {boolean} notifyParent (optional) Set to true to cause any containing
     * nodes to update their size.  If omitted, use false.
     */
    addChild(node: DerNode, notifyParent?: boolean);

    /**
     * Mark the child list as dirty, so that we update size when necessary.
     */
    setChildChanged(): void;

    /**
     * Override the base encode to return raw data encoding for this node and its
     * children.
     * @return {Blob} The raw data encoding.
     */
    encode(): Blob;

    /**
     * Override the base decode to decode and store the data from an input
     * buffer. Recursively populates child nodes.
     * @param {Buffer} inputBuf The input buffer to read from.
     * @param {number} startIdx The offset into the buffer.
     */
    decode(inputBuf: Buffer, startIdx: number);
}

/**
 * DerInteger extends DerNode to encode an integer value.
 * Create a new DerInteger for the value.
 * @param {number|Buffer} integer The value to encode. If integer is a Buffer
 * byte array of a positive integer, you must ensure that the first byte is less
 * than 0x80.
 */
export class DerInteger extends DerNode {
    toVal(): number;
}

/**
 * A DerBitString extends DerNode to handle a bit string.
 * Create a DerBitString with the given padding and inputBuf.
 * @param {Buffer} inputBuf An input buffer containing the bit octets to encode.
 * @param {number} paddingLen The number of bits of padding at the end of the bit
 * string.  Should be less than 8.
 */
export class DerBitString extends DerNode {

}

/**
 * DerOctetString extends DerByteString to encode a string of bytes.
 * Create a new DerOctetString for the inputData.
 * @param {Buffer} inputData An input buffer containing the string to encode.
 */
export class DerOctetString extends DerNode {

}

/**
 * A DerNull extends DerNode to encode a null value.
 * Create a DerNull.
 */
export class DerNull extends DerNode {

}

/**
 * A DerOid extends DerNode to represent an object identifier.
 * Create a DerOid with the given object identifier. The object identifier
 * string must begin with 0,1, or 2 and must contain at least 2 digits.
 * @param {string|OID} oid The OID string or OID object to encode.
 */
export class DerOid extends DerNode {
    /**
     * Encode a sequence of integers into an OID object and set the payload.
     * @param {Array<number>} value The array of integers.
     */
    prepareEncoding(value: number[]);

    /**
     * Compute the encoding for one part of an OID, where values greater than 128
     * must be encoded as multiple bytes.
     * @param {number} value A component of an OID.
     * @return {Buffer} The encoded buffer.
     */
    static encode128(value: number): Buffer;

    /**
     * Convert an encoded component of the encoded OID to the original integer.
     * @param {number} offset The offset into this node's payload.
     * @param {Array<number>} skip Set skip[0] to the number of payload bytes to skip.
     * @return {number} The original integer.
     */
    decode128(offset: number, skip: number[]): number;

    /**
     * Override to return the string representation of the OID.
     * @return {string} The string representation of the OID.
     */
    toVal(): string;
}

/**
 * A DerSequence extends DerStructure to contains an ordered sequence of other
 * nodes.
 * Create a DerSequence.
 */
export class DerSequence extends DerStructure {

}

/**
 * A DerPrintableString extends DerByteString to handle a a printable string. No
 * escaping or other modification is done to the string.
 * Create a DerPrintableString with the given inputData.
 * @param {Buffer} inputData An input buffer containing the string to encode.
 */
export class DerPrintableString extends DerByteString {

}

/**
 * A DerGeneralizedTime extends DerNode to represent a date and time, with
 * millisecond accuracy.
 * Create a DerGeneralizedTime with the given milliseconds since 1970.
 * @param {number} msSince1970 The timestamp as milliseconds since Jan 1, 1970.
 */
export class DerGeneralizedTime extends DerNode {
    /**
     * Convert a UNIX timestamp to the internal string representation.
     * @param {type} msSince1970 Timestamp as milliseconds since Jan 1, 1970.
     * @return {string} The string representation.
     */
    static toDerTimeString(msSince1970: number): string;

    /**
     * A private method to zero pad an integer to 2 digits.
     * @param {number} x The number to pad.  Assume it is a non-negative integer.
     * @return {string} The padded string.
     */
    static to2DigitString(x: number): string;

    /**
     * Override to return the milliseconds since 1970.
     * @return {number} The timestamp value as milliseconds since 1970.
     */
    toVal(): number;
}

export class DerNode {
    static DerSequence: any;

    /**
     * Return the number of bytes in DER
     * @return {number}
     */
    getSize(): number;

    /**
     * Encode the given size and update the header.
     * @param {number} size
     */
    encodeHeader(size: number): void;

    /**
     * Extract the header from an input buffer and return the size.
     * @param {Buffer} inputBuf The input buffer to read from.
     * @param {number} startIdx The offset into the buffer.
     * @return {number} The parsed size in the header.
     */
    decodeHeader(inputBuf: Buffer, startIdx: number): number;

    /**
     * Get the raw data encoding for this node.
     * @return {Blob} The raw data encoding.
     */
    encode(): Blob;

    /**
     * Decode and store the data from an input buffer.
     * @param {Buffer} inputBuf The input buffer to read from. This reads from
     * startIdx (regardless of the buffer's position) and does not change the
     * position.
     * @param {number} startIdx The offset into the buffer.
     */
    decode(inputBuf: Buffer, startIdx: number);

    /**
     * Copy buffer to this.payload_ at this.payloadPosition_ and update
     * this.payloadPosition_.
     * @param {Buffer} buffer The buffer to copy.
     */
    payloadAppend(buffer: Buffer);

    /**
     * Parse the data from the input buffer recursively and return the root as an
     * object of a subclass of DerNode.
     * @param {Buffer} inputBuf The input buffer to read from.
     * @param {number} startIdx (optional) The offset into the buffer. If omitted,
     * use 0.
     * @return {DerNode} An object of a subclass of DerNode.
     */
    static parse(inputBuf: Buffer, startIdx: number): DerNode;

    /**
     * Convert the encoded data to a standard representation. Overridden by some
     * subclasses (e.g. DerBoolean).
     * @return {Blob} The encoded data as a Blob.
     */
    toVal(): any;

    /**
     * Get a copy of the payload bytes.
     * @return {Blob} A copy of the payload.
     */
    getPayload(): Blob;

    /**
     * If this object is a DerNode.DerSequence, get the children of this node.
     * Otherwise, throw an exception. (DerSequence overrides to implement this
     * method.)
     * @return {Array<DerNode>} The children as an array of DerNode.
     * @throws DerDecodingException if this object is not a DerSequence.
     */
    getChildren(): DerNode[];

    /**
     * Check that index is in bounds for the children list, return children[index].
     * @param {Array<DerNode>} children The list of DerNode, usually returned by
     * another call to getChildren.
     * @param {number} index The index of the children.
     * @return {DerNode.DerSequence} children[index].
     * @throws DerDecodingException if index is out of bounds or if children[index]
     * is not a DerSequence.
     */
    static getSequence(children: DerNode[], index: number): DerSequence
}