export class ValidationError {
    /**
     * A ValidationError holds an error code and an optional detailed error message.
     *
     * Create a new ValidationError for the given code.
     * @param {number} code The code which is one of the standard error codes such as
     * ValidationError.INVALID_SIGNATURE, or a custom code if greater than or equal
     * to ValidationError.USER_MIN .
     * @param {string} info {optinal) The error message. If omitted, use an empty
     * string.
     * @constructor
     */
    constructor(code: number, info: string);

    static NO_ERROR: number;
    static INVALID_SIGNATURE: number;
    static NO_SIGNATURE: number;
    static CANNOT_RETRIEVE_CERTIFICATE: number;
    static EXPIRED_CERTIFICATE: number;
    static LOOP_DETECTED: number;
    static MALFORMED_CERTIFICATE: number;
    static EXCEEDED_DEPTH_LIMIT: number;
    static INVALID_KEY_LOCATOR: number;
    static POLICY_ERROR: number;
    static IMPLEMENTATION_ERROR: number;
// Custom error codes should use >= USER_MIN.
    static USER_MIN: number;

    /**
     * Get the error code given to the constructor.
     * @return {number} The error code which is one of the standard error codes such as
     * ValidationError.INVALID_SIGNATURE, or a custom code if greater than or equal
     * to ValidationError.USER_MIN.
     */
    getCode(): number;

    /**
     * Get the error message given to the constructor.
     * @return {string} The error message, or "" if none.
     */
    getInfo(): string;

    /**
     * Get a string representation of this ValidationError.
     * @return {string} The string representation.
     */
    toString(): string;
}