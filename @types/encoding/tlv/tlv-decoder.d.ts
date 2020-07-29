import {
    DecodingException
} from '../decoding-exception';

/**
 * Create a new TlvDecoder for decoding the input in the NDN-TLV wire format.
 * @constructor
 * @param {Buffer} input The buffer with the bytes to decode.
 */
export class TlvDecoder {
    constructor(input: Buffer);

    /**
     * Decode VAR-NUMBER in NDN-TLV and return it. Update offset.
     * @return {number} The decoded VAR-NUMBER.
     */
    readVarNumber(): number;

    /**
     * A private function to do the work of readVarNumber, given the firstOctet
     * which is >= 253.
     * @param {number} firstOctet The first octet which is >= 253, used to decode
     * the remaining bytes.
     * @return {number} The decoded VAR-NUMBER.
     */
    readExtendedVarNumber(firstOctet: number): number;

    /**
     * Decode the type and length from this's input starting at offset, expecting
     * the type to be expectedType and return the length. Update offset.  Also make
     * sure the decoded length does not exceed the number of bytes remaining in the
     * input.
     * @param {number} expectedType The expected type.
     * @return {number} The length of the TLV.
     * @throws DecodingException if (did not get the expected TLV type or the TLV length
     * exceeds the buffer length.
     */
    readTypeAndLength(expectedType: number): number;

    /**
     * Decode the type and length from the input starting at offset, expecting the
     * type to be expectedType.  Update offset.  Also make sure the decoded length
     * does not exceed the number of bytes remaining in the input. Return the offset
     * of the end of this parent TLV, which is used in decoding optional nested
     * TLVs. After reading all nested TLVs, call finishNestedTlvs.
     * @param {number} expectedType The expected type.
     * @return {number} The offset of the end of the parent TLV.
     * @throws DecodingException if did not get the expected TLV type or the TLV
     * length exceeds the buffer length.
     */
    readNestedTlvsStart(expectedType: number): number;

    /**
     * Call this after reading all nested TLVs to skip any remaining unrecognized
     * TLVs and to check if the offset after the final nested TLV matches the
     * endOffset returned by readNestedTlvsStart. Update the offset as needed if
     * skipping TLVs.
     * @param {number} endOffset The offset of the end of the parent TLV, returned
     * by readNestedTlvsStart.
     * @param {boolean} skipCritical (optional) If omitted or false and the
     * unrecognized type code to skip is critical, throw an exception. If true, then
     * skip the unrecognized type code without error.
     * @throws DecodingException if the TLV length does not equal the total length
     * of the nested TLVs, or if skipCritical is false and the unrecognized type
     * code to skip is critical.
     */
    finishNestedTlvs(endOffset: number, skipCritical?: boolean): void;

    /**
     * Decode the type from this's input starting at offset, and if it is the
     * expectedType, then return true, else false.  However, if this's offset is
     * greater than or equal to endOffset, then return false and don't try to read
     * the type. Do not update offset.
     * @param {number} expectedType The expected type.
     * @param {number} endOffset The offset of the end of the parent TLV, returned
     * by readNestedTlvsStart.
     * @return {boolean} true if the type of the next TLV is the expectedType,
     *  otherwise false.
     */
    peekType(expectedType: number, endOffset: number): boolean;

    /**
     * Decode a non-negative integer in NDN-TLV and return it. Update offset by
     * length.
     * @param {number} length The number of bytes in the encoded integer.
     * @return {number} The integer.
     * @throws DecodingException if length is an invalid length for a TLV
     * non-negative integer.
     */
    readNonNegativeInteger(length: number): number;

    /**
     * Decode the type and length from this's input starting at offset, expecting
     * the type to be expectedType. Then decode a non-negative integer in NDN-TLV
     * and return it.  Update offset.
     * @param {number} expectedType The expected type.
     * @return {number} The integer.
     * @throws DecodingException if did not get the expected TLV type or can't
     * decode the value.
     */
    readNonNegativeIntegerTlv(expectedType: number): number;

    /**
     * Peek at the next TLV, and if it has the expectedType then call
     * readNonNegativeIntegerTlv and return the integer.  Otherwise, return null.
     * However, if this's offset is greater than or equal to endOffset, then return
     * null and don't try to read the type.
     * @param {number} expectedType The expected type.
     * @param {number} endOffset The offset of the end of the parent TLV, returned
     * by readNestedTlvsStart.
     * @return {number} The integer or null if the next TLV doesn't have the
     * expected type.
     */
    readOptionalNonNegativeIntegerTlv(expectedType: number, endOffset: number): number;

    /**
     * Decode the type and length from this's input starting at offset, expecting
     * the type to be expectedType. Then return an array of the bytes in the value.
     * Update offset.
     * @param {number} expectedType The expected type.
     * @return {Buffer} The bytes in the value as a slice on the buffer.  This is
     * not a copy of the bytes in the input buffer.  If you need a copy, then you
     * must make a copy of the return value.
     * @throws DecodingException if did not get the expected TLV type.
     */
    readBlobTlv(expectedType: number): Buffer;

    /**
     * Peek at the next TLV, and if it has the expectedType then call readBlobTlv
     * and return the value.  Otherwise, return null. However, if this's offset is
     * greater than or equal to endOffset, then return null and don't try to read
     * the type.
     * @param {number} expectedType The expected type.
     * @param {number} endOffset The offset of the end of the parent TLV, returned
     * by readNestedTlvsStart.
     * @return {Buffer} The bytes in the value as a slice on the buffer or null if
     * the next TLV doesn't have the expected type.  This is not a copy of the bytes
     * in the input buffer.  If you need a copy, then you must make a copy of the
     * return value.
     */
    readOptionalBlobTlv(expectedType: number, endOffset: number): Buffer;

    /**
     * Peek at the next TLV, and if it has the expectedType then read a type and
     * value, ignoring the value, and return true. Otherwise, return false.
     * However, if this's offset is greater than or equal to endOffset, then return
     * false and don't try to read the type.
     * @param {number} expectedType The expected type.
     * @param {number} endOffset The offset of the end of the parent TLV, returned
     * by readNestedTlvsStart.
     * @return {boolean} true, or else false if the next TLV doesn't have the
     * expected type.
     */
    readBooleanTlv(expectedType: number, endOffset: number): boolean;

    /**
     * Decode the type and length from the input starting at the input buffer
     * position, expecting the type to be expectedType, then skip (and ignore) the
     * value. Update offset.
     * @param {number} expectedType The expected type.
     * @throws DecodingException if did not get the expected TLV type.
     */
    skipTlv(expectedType: number): void;

    /**
     * Peek at the next TLV, and if it has the expectedType then call skipTlv to
     * skip (and ignore) it.
     * @param {number} expectedType The expected type.
     * @param {number} endOffset The offset of the end of the parent TLV, returned
     * by readNestedTlvsStart.
     */
    skipOptionalTlv(expectedType: number, endOffset: number): void;

    /**
     * Get the offset into the input, used for the next read.
     * @return {number} The offset.
     */
    getOffset(): number;

    /**
     * Set the offset into the input, used for the next read.
     * @param {number} offset The new offset.
     */
    seek(offset: number): void;

    /**
     * Return an array of a slice of the input for the given offset range.
     * @param {number} beginOffset The offset in the input of the beginning of the
     * slice.
     * @param {number} endOffset The offset in the input of the end of the slice.
     * @return {Buffer} The bytes in the value as a slice on the buffer.  This is
     * not a copy of the bytes in the input buffer.  If you need a copy, then you
     * must make a copy of the return value.
     */
    getSlice(beginOffset: number, endOffset: number): Buffer;
}