export class ValidatorConfigError {
    /**
     * Create a new ValidatorConfigError to report an  error using ValidatorConfig.
     * Call with: throw new ValidatorConfigError(new Error("message")).
     * @param {Error} error The exception created with new Error.
     * @constructor
     */
    constructor(error: Error);
}