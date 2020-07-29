export class Interval {
    /**
     * An Interval defines a time duration which contains a start timestamp and an
     * end timestamp. Create an Interval with one of these forms:
     * Interval(isValid).
     * Interval(startTime, endTime).
     * Interval(interval).
     * @param {boolean} isValid True to create a valid empty interval, false to
     * create an invalid interval.
     * @param {number} startTime The start time as milliseconds since Jan 1, 1970 UTC.
     * The start time must be less than the end time. To create an empty interval
     * (start time equals end time), use the constructor Interval(true).
     * @param {number} endTime The end time as milliseconds since Jan 1, 1970 UTC.
     * @param {Interval} interval The other interval with values to copy.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(value: boolean | object | number, endTime: number);

    /**
     * Set this interval to have the same values as the other interval.
     * @param {Interval} other The other Interval with values to copy.
     */
    set(other: Interval): void;

    /**
     * Check if the time point is in this interval.
     * @param {number} timePoint The time point to check as milliseconds since
     * Jan 1, 1970 UTC.
     * @return {boolean} True if timePoint is in this interval.
     * @throws Error if this Interval is invalid.
     */
    covers(timePoint: number): boolean;

    /**
     * Set this Interval to the intersection of this and the other interval.
     * This and the other interval should be valid but either can be empty.
     * @param {Interval} interval The other Interval to intersect with.
     * @return {Interval} This Interval.
     * @throws Error if this Interval or the other interval is invalid.
     */
    intersectWith(interval: Interval);

    /**
     * Set this Interval to the union of this and the other interval.
     * This and the other interval should be valid but either can be empty.
     * This and the other interval should have an intersection. (Contiguous
     * intervals are not allowed.)
     * @param {Interval} interval The other Interval to union with.
     * @return {Interval} This Interval.
     * @throws Error if this Interval or the other interval is invalid, or if the
     * two intervals do not have an intersection.
     */
    unionWith(interval: Interval);

    /**
     * Get the start time.
     * @return {number} The start time as milliseconds since Jan 1, 1970 UTC.
     * @throws Error if this Interval is invalid.
     */
    getStartTime(): number;

    /**
     * Get the end time.
     * @return {number} The end time as milliseconds since Jan 1, 1970 UTC.
     * @throws Error if this Interval is invalid.
     */
    getEndTime(): number;

    /**
     * Check if this Interval is valid.
     * @return {boolean} True if this interval is valid, false if invalid.
     */
    isValid(): boolean;

    /**
     * Check if this Interval is empty.
     * @return {boolean} True if this Interval is empty (start time equals end time),
     * false if not.
     * @throws Error if this Interval is invalid.
     */
    isEmpty(): boolean;
}