export class DataUtils {
    /**
     * Raw String to Base 64
     */
    static stringtoBase64(input: string): string;

    /**
     * Base 64 to Raw String
     */
    static base64toString(input: string): string;

    /**
     * Buffer to Hex String
     */
    static toHex(buffer: Buffer): string;

    /**
     * Raw string to hex string.
     */
    static stringToHex(args: string): string;

    /**
     * Buffer to raw string.
     */
    static toString(buffer: Buffer): string;

    /**
     * Hex String to Buffer.
     */
    static toNumbers(str): Buffer;

    /**
     * Hex String to raw string.
     */
    static hexToRawString(str: string): string;

    /**
     * Raw String to Buffer.
     */
    static toNumbersFromString(str: string): Buffer;

    /**
     * If value is a string, then interpret it as a raw string and convert to
     * a Buffer. Otherwise assume it is a Buffer or array type and just return it.
     * @param {string|any} value
     * @return {Buffer}
     */
    static toNumbersIfString(value: string | any): Buffer;

    /**
     * Encode str as utf8 and return as Buffer.
     */
    static stringToUtf8Array(str: string): Buffer;

    /**
     * arrays is an array of Buffer. Return a new Buffer which is the concatenation of all.
     */
    static concatArrays(arrays: Buffer[]): Buffer;

    // TODO: Take Buffer and use TextDecoder when available.
    static decodeUtf8(utftext: Buffer): string;

    /**
     * Return true if a1 and a2 are the same length with equal elements.
     */
    static arraysEqual(a1: any[], a2: any[]): boolean;

    /**
     * Convert the big endian Buffer to an unsigned int.
     * Don't check for overflow.
     */
    static bigEndianToUnsignedInt(bytes: Buffer): number;

    /**
     * Convert the int value to a new big endian Buffer and return.
     * If value is 0 or negative, return new Buffer(0).
     */
    static nonNegativeIntToBigEndian(value: number): Buffer;

    /**
     * Modify array to randomly shuffle the elements.
     */
    static shuffle(array: any[]): any[];

    /**
     * Decode the base64-encoded private key PEM and return the binary DER.
     * @param {string} privateKeyPem The PEM-encoded private key.
     * @return {Buffer} The binary DER.
     *
     */
    static privateKeyPemToDer(privateKeyPem: string): Buffer;

}