import {Interest} from "../../interest";
import {Data} from "../../data";

export class ValidationRequest {
    /**
     * A ValidationRequest is used to return information from
     * PolicyManager.checkVerificationPolicy.
     *
     * Create a new ValidationRequest with the given values.
     * @param {Interest} interest An interest for fetching more data.
     * @param {function} onVerified If the signature is verified, this calls
     * onVerified(data).
     * @param {function} onValidationFailed If the signature check fails, this calls
     * onValidationFailed(data, reason).
     * @param {number} retry The number of retrials when there is an interest timeout.
     * @param {number} stepCount  The number of verification steps that have been
     * done, used to track the verification progress.
     * @constructor
     */
    constructor(interest: Interest, onVerified: (data: Data) => any,
                onValidationFailed: (data: Data, reason: any) => any, retry: number, stepCount: number);
}