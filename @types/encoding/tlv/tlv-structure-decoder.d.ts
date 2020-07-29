export class TlvStructureDecoder {
    static READ_TYPE: number;
    static READ_TYPE_BYTES: number;
    static READ_LENGTH: number;
    static READ_LENGTH_BYTES: number;
    static READ_VALUE_BYTES: number;

    /**
     * Continue scanning input starting from this.offset_ to find the element end.
     * If the end of the element which started at offset 0 is found, this returns
     * true and getOffset() is the length of the element.  Otherwise, this returns
     * false which means you should read more into input and call again.
     * @param {Buffer} input The input buffer. You have to pass in input each time
     * because the buffer could be reallocated.
     * @return {boolean} true if found the element end, false if not.
     */
    findElementEnd(input: Buffer): boolean;

    /**
     * Get the current offset into the input buffer.
     * @return {number} The offset.
     */
    getOffset(): number;

    /**
     * Set the offset into the input, used for the next read.
     * @param {number} offset The new offset.
     */
    seek(number): void;
}