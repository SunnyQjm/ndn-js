import {Signature} from "../signature";

export class ValidityPeriod {
    /**
     * A ValidityPeriod is used in a Data packet's SignatureInfo and represents the
     * begin and end times of a certificate's validity period.
     *
     * There are three forms of the ValidityPeriod constructor:
     * ValidityPeriod() - Create a default ValidityPeriod where the period is not
     * specified.
     * ValidityPeriod(validityPeriod) - Create a new ValidityPeriod with a copy of
     * the fields in the given validityPeriod object.
     * ValidityPeriod(notBefore, notAfter) - Create a ValidityPeriod with the given
     * period.
     * @param {ValidityPeriod} validityPeriod The ValidityPeriod to copy.
     * @param {number} notBefore The beginning of the validity period range as
     * milliseconds since Jan 1, 1970 UTC. Note that this is rounded up to the
     * nearest whole second.
     * @param {number} notAfter The end of the validity period range as milliseconds
     * since Jan 1, 1970 UTC. Note that this is rounded down to the nearest whole
     * second.
     * @constructor
     */
    constructor(validityPeriodOrNotBefore?: ValidityPeriod | number, notAfter?: number);

    /**
     * Check if the period has been set.
     * @return {boolean} True if the period has been set, false if the period is not
     * specified (after calling the default constructor or clear).
     */
    hasPeriod(): boolean;

    /**
     * Get the beginning of the validity period range.
     * @return {number} The time as milliseconds since Jan 1, 1970 UTC.
     */
    getNotBefore(): number;

    /**
     * Get the end of the validity period range.
     * @return {number} The time as milliseconds since Jan 1, 1970 UTC.
     */
    getNotAfter(): number;

    /** Reset to a default ValidityPeriod where the period is not specified.
     */
    clear(): void;

    /**
     * Set the validity period.
     * @param {number} notBefore The beginning of the validity period range as
     * milliseconds since Jan 1, 1970 UTC. Note that this is rounded up to the
     * nearest whole second.
     * @param {number} notAfter The end of the validity period range as milliseconds
     * since Jan 1, 1970 UTC. Note that this is rounded down to the nearest whole
     * second.
     * @return {ValidityPeriod} This ValidityPeriod so that you can chain calls to
     * update values.
     */
    setPeriod(notBefore: number, notAfter: number): ValidityPeriod;

    /**
     * Check if the time falls within the validity period.
     * @param {number} time (optional) The time to check as milliseconds since
     * Jan 1, 1970 UTC. If omitted, use the current time.
     * @return {boolean} True if the beginning of the validity period is less than
     * or equal to time and time is less than or equal to the end of the validity
     * period.
     */
    isValid(time: number): boolean;

    /**
     * If the signature is a type that has a ValidityPeriod (so that
     * getFromSignature will succeed), return true. Note: This is a static method of
     * ValidityPeriod instead of a method of Signature so that the Signature base
     * class does not need to be overloaded with all the different kinds of
     * information that various signature algorithms may use.
     * @param {Signature} signature An object of a subclass of Signature.
     * @return {boolean} True if the signature is a type that has a ValidityPeriod,
     * otherwise false.
     */
    static canGetFromSignature(signature: Signature): boolean;

    /**
     * If the signature is a type that has a ValidityPeriod, then return it.
     * Otherwise throw an error. To check if the signature has a ValidityPeriod
     * without throwing an error, you can use canGetFromSignature().
     * @param {Signature} An object of a subclass of Signature.
     * @return {ValidityPeriod} The signature's ValidityPeriod. It is an error if
     * signature doesn't have a ValidityPeriod.
     */
    static getFromSignature(signature: Signature): ValidityPeriod;

    /**
     * Get the change count, which is incremented each time this object is changed.
     * @return {number} The change count.
     */
    getChangeCount(): number;
}