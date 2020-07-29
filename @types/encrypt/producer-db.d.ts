import {Blob, SyncPromise} from "../util";

export class ProducerDb {
    /**
     * ProducerDb is a base class for the storage of keys for the producer. It contains
     * one table that maps time slots (to the nearest hour) to the content key
     * created for that time slot. A subclass must implement the methods. For
     * example, see Sqlite3ProducerDb (for Nodejs) or IndexedDbProducerDb (for the
     * browser).
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor();

    /**
     * Check if a content key exists for the hour covering timeSlot.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns true if there is a
     * content key for timeSlot (else false), or that is rejected with
     * ProducerDb.Error for a database error.
     */
    hasContentKeyPromise(timeSlot: number, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Get the content key for the hour covering timeSlot.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns a Blob with the encoded
     * key, or that is rejected with ProducerDb.Error if there is no key covering
     * timeSlot, or other database error
     */
    getContentKeyPromise(timeSlot: number, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Add key as the content key for the hour covering timeSlot.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @param {Blob} key The encoded key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the key is added,
     * or that is rejected with ProducerDb.Error if a key for the same hour already
     * exists in the database, or other database error.
     */
    addContentKeyPromise(timeSlot: number, key: Blob, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete the content key for the hour covering timeSlot. If there is no key for
     * the time slot, do nothing.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the key is deleted
     * (or there is no such key), or that is rejected with ProducerDb.Error for a
     * database error.
     */
    deleteContentKeyPromise(timeSlot: number, useSync?: boolean);

    /**
     * Get the hour-based time slot.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @return {number} The hour-based time slot as hours since Jan 1, 1970 UTC.
     */
    getFixedTimeSlot(timeSlot: number): number;
}

export namespace ProducerDb {
    class Error {
        /**
         * Create a new ProducerDb.Error to report an error using ProducerDb
         * methods, wrapping the given error object.
         * Call with: throw new ProducerDb.Error(new Error("message")).
         * @constructor
         * @param {Error} error The exception created with new Error.
         */
        constructor(error: Error);
    }
}