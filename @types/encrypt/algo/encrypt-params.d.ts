import {Blob} from "../../util";

export class EncryptAlgorithmType {
    // These correspond to the TLV codes.
    static AesEcb: number;
    static AesCbc: number;
    static RsaPkcs: number;
    static RsaOaep: number;
}

/**
 * An EncryptParams holds an algorithm type and other parameters used to
 * encrypt and decrypt. Create an EncryptParams with the given parameters.
 * @param {number} algorithmType The algorithm type from EncryptAlgorithmType,
 * or null if not specified.
 * @param {number} initialVectorLength (optional) The initial vector length, or
 * 0 if the initial vector is not specified. If ommitted, the initial vector is
 * not specified.
 * @note This class is an experimental feature. The API may change.
 * @constructor
 */
export class EncryptParams {
    /**
     * Get the algorithmType.
     * @return {number} The algorithm type from EncryptAlgorithmType, or null if not
     * specified.
     */
    getAlgorithmType(): number;

    /**
     * Get the initial vector.
     * @return {Blob} The initial vector. If not specified, isNull() is true.
     */
    getInitialVector(): Blob;

    /**
     * Set the algorithm type.
     * @param {number} algorithmType The algorithm type from EncryptAlgorithmType.
     * If not specified, set to null.
     * @return {EncryptParams} This EncryptParams so that you can chain calls to
     * update values.
     */
    setAlgorithmType(algorithmType: number): EncryptParams;

    /**
     * Set the initial vector.
     * @param {Blob} initialVector The initial vector. If not specified, set to the
     * default Blob() where isNull() is true.
     * @return {EncryptParams} This EncryptParams so that you can chain calls to
     * update values.
     */
    setInitialVector(initialVector: Blob): EncryptParams;
}