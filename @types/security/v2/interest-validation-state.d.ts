import {Interest} from "../../interest";
import {ValidationError} from "./validation-error";

export class InterestValidationState {
    /**
     * The InterestValidationState class extends ValidationState to hold the
     * validation state for an Interest packet.
     *
     * Create an InterestValidationState for the Interest packet. The caller must
     * ensure that the state instance is valid until the validation finishes (i.e.,
     * until validateCertificateChain() and validateOriginalPacket() have been
     * called).
     * @param {Interest} interest The Interest packet being validated, which is copied.
     * @param {function} successCallback This calls successCallback(interest) to
     * report a successful Interest validation.
     * @param {function} failureCallback This calls failureCallback(interest, error)
     * to report a failed Interest validation, where error is a ValidationError.
     * @constructor
     */
    constructor(interest: Interest, successCallback: (interest: Interest) => any, failureCallback: (interest: Interest, error: any) => any);

    /**
     * Call the failure callback.
     * @param {ValidationError} error
     */
    fail(error: ValidationError);

    /**
     * Get the original Interest packet being validated which was given to the
     * constructor.
     * @return {Interest} The original Interest packet.
     */
    getOriginalInterest(): Interest;

    /**
     * @param {function} successCallback This calls successCallback(interest).
     */
    addSuccessCallback(successCallback: (interest: Interest) => any);


}