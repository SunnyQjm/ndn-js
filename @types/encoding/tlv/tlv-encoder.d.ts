export class TlvEncoder {
    /**
     * Get the number of bytes that have been written to the output.  You can
     * save this number, write sub TLVs, then subtract the new length from this
     * to get the total length of the sub TLVs.
     * @return {number} The number of bytes that have been written to the output.
     */
    getLength(): number;

    /**
     * Encode varNumber as a VAR-NUMBER in NDN-TLV and write it to this.output just
     * before this.length from the back.  Advance this.length.
     * @param {number} varNumber The non-negative number to encode.
     */
    writeVarNumber(varNumber: number): void;

    /**
     * Encode the type and length as VAR-NUMBER and write to this.output just before
     * this.length from the back.  Advance this.length.
     * @param {number} type The type of the TLV.
     * @param {number} length The non-negative length of the TLV.
     */
    writeTypeAndLength(type: number, length: number): void;

    /**
     * Write value as a non-negative integer and write it to this.output just before
     * this.length from the back. Advance this.length.
     * @param {number} value The non-negative integer to encode.
     */
    writeNonNegativeInteger(value: number): void;

    /**
     * Write the type, then the length of the encoded value then encode value as a
     * non-negative integer and write it to this.output just before this.length from
     * the back. Advance this.length.
     * @param {number} type The type of the TLV.
     * @param {number} value The non-negative integer to encode.
     */
    writeNonNegativeIntegerTlv(type: number, value: number): void;

    /**
     * If value is negative or null then do nothing, otherwise call
     * writeNonNegativeIntegerTlv.
     * @param {number} type The type of the TLV.
     * @param {number} value If negative or null do nothing, otherwise the integer
     *   to encode.
     */
    writeOptionalNonNegativeIntegerTlv(type: number, value: number): void;

    /**
     * Write the buffer value to this.output just before this.length from the back.
     * Advance this.length.
     * @param {Buffer} buffer The byte array with the bytes to write.  If value is
     * null, then do nothing.
     */
    writeBuffer(buffer: Buffer);

    /**
     * Write the type, then the length of the buffer then the buffer value to
     * this.output just before this.length from the back. Advance this.length.
     * @param {number} type The type of the TLV.
     * @param {Buffer} value The byte array with the bytes of the blob.  If value is
     null, then just write the type and length 0.
     */
    writeBlobTlv(type: number, value: Buffer): void;

    /**
     * If the byte array is null or zero length then do nothing, otherwise call
     * writeBlobTlv.
     * @param {number} type The type of the TLV.
     * @param {Buffer} value If null or zero length do nothing, otherwise the byte
     * array with the bytes of the blob.
     */
    writeOptionalBlobTlv(type: number, value: Buffer): void;

    /**
     * Get a slice of the encoded bytes.
     * @return {Buffer} A slice backed by the encoding Buffer.
     */
    getOutput(): Buffer;
}