export class SecurityException {
    /**
     * Create a new SecurityException to report an exception from the security
     * library, wrapping the given error object.
     * Call with: throw new SecurityException(new Error("message")).
     * @constructor
     * @param {Error} error The exception created with new Error.
     */
    constructor(error: Error);
}

export class UnrecognizedKeyFormatException {
    constructor(error: Error);
}

export class UnrecognizedDigestAlgorithmException {
    constructor(error: Error);
}

export class InvalidArgumentException {
    constructor(error: Error);
}