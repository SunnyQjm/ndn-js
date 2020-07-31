import {Data} from "../../data";
import {ValidationError} from "./validation-error";

export class DataValidationState {
    /**
     * The DataValidationState class extends ValidationState to hold the validation
     * state for a Data packet.
     *
     * Create a DataValidationState for the Data packet. The caller must ensure that
     * the state instance is valid until the validation finishes (i.e., until
     * validateCertificateChain() and validateOriginalPacket() have been called).
     * @param {Data} data The Date packet being validated, which is copied.
     * @param {function} successCallback This calls successCallback(data) to report
     * a successful Data validation.
     * @param {function} failureCallback This calls failureCallback(data, error) to
     * report a failed Data validation, where error is a ValidationError.
     * @constructor
     */
    constructor(data: Data, successCallback: (data: Data) => any, failureCallback: (data: Data, error: any) => any);

    fail(error: ValidationError);

    /**
     * Get the original Data packet being validated which was given to the
     * constructor.
     * @return {Data} The original Data packet.
     */
    getOriginalData(): Data;
}