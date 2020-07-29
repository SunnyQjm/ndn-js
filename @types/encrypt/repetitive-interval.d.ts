import {Interval} from "./interval";

export class RepetitiveInterval {
    /**
     * A RepetitiveInterval is an advanced interval which can repeat and can be used
     * to find a simple Interval that a time point falls in. Create a
     * RepetitiveInterval with one of these forms:
     * RepetitiveInterval() A RepetitiveInterval with one day duration, non-repeating..
     * RepetitiveInterval(startDate, endDate, intervalStartHour, intervalEndHour, nRepeats, repeatUnit).
     * RepetitiveInterval(repetitiveInterval).
     * @param {number} startDate The start date as milliseconds since Jan 1, 1970 UTC.
     * startDate must be earlier than or same as endDate. Or if repeatUnit is
     * RepetitiveInterval.RepeatUnit.NONE, then it must equal endDate.
     * @param {number} endDate The end date as milliseconds since Jan 1, 1970 UTC.
     * @param {number} intervalStartHour The start hour in the day, from 0 to 23.
     * intervalStartHour must be less than intervalEndHour.
     * @param {number} intervalEndHour The end hour in the day from 1 to 24.
     * @param {number} nRepeats (optional) Repeat the interval nRepeats repetitions,
     * every unit, until endDate. If ommitted, use 0.
     * @param {number} repeatUnit (optional) The unit of the repetition, from
     * RepetitiveInterval.RepeatUnit. If ommitted, use NONE. If this is NONE or
     * ommitted, then startDate must equal endDate.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(startDate: number, endDate: number, intervalStartHour: number, intervalEndHour: number,
                nRepeats: number, repeatUnit: number);

    /**
     * Get an interval that covers the time point. If there is no interval
     * covering the time point, this returns false for isPositive and returns a
     * negative interval.
     * @param {number} timePoint The time point as milliseconds since Jan 1, 1970 UTC.
     * @return {object} An associative array with fields
     * (isPositive, interval) where
     * isPositive is true if the returned interval is
     * positive or false if negative, and interval is the Interval covering the time
     * point or a negative interval if not found.
     */
    getInterval(timePoint: number): { isPositive: boolean, interval: Interval };

    /**
     * Compare this to the other RepetitiveInterval.
     * @param {RepetitiveInterval} other The other RepetitiveInterval to compare to.
     * @return {number} -1 if this is less than the other, 1 if greater and 0 if equal.
     */
    compare(other: RepetitiveInterval): number;

    /**
     * Get the start date.
     * @return {number} The start date as milliseconds since Jan 1, 1970 UTC.
     */
    getStartDate(): number;

    /**
     * Get the end date.
     * @return {number} The end date as milliseconds since Jan 1, 1970 UTC.
     */
    getEndDate(): number;

    /**
     * Get the interval start hour.
     * @return {number} The interval start hour.
     */
    getIntervalStartHour(): number;

    /**
     * Get the interval end hour.
     * @return {number} The interval end hour.
     */
    getIntervalEndHour(): number;

    /**
     * Get the number of repeats.
     * @return {number} The number of repeats.
     */
    getNRepeats(): number;

    /**
     * Get the repeat unit.
     * @return {number} The repeat unit, from RepetitiveInterval.RepeatUnit.
     */
    getRepeatUnit(): number;


    static MILLISECONDS_IN_HOUR: number;
    static MILLISECONDS_IN_DAY: number;
}

export namespace RepetitiveInterval {
    class RepeatUnit {
        NONE: 0
        DAY: 1
        MONTH: 2
        YEAR: 3
    }
}