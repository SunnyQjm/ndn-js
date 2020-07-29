import {Interest} from "../interest";
import {OnDataCallback, OnNetworkNackCallback, OnTimeoutCallback} from "../face";
import {Data} from "../data";

export class PendingInterestTable {
    /**
     * A PendingInterestTable is an internal class to hold a list of pending
     * interests with their callbacks.
     * @constructor
     */
    constructor();

    /**
     * Add a new entry to the pending interest table. Also set a timer to call the
     * timeout. However, if removePendingInterest was already called with the
     * pendingInterestId, don't add an entry and return null.
     * @param {number} pendingInterestId
     * @param {Interest} interestCopy
     * @param {function} onData
     * @param {function} onTimeout
     * @param {function} onNetworkNack
     * @return {PendingInterestTable.Entry} The new PendingInterestTable.Entry, or
     * null if removePendingInterest was already called with the pendingInterestId.
     */
    add(pendingInterestId: number, interestCopy: Interest, onData: OnDataCallback, onTimeout: OnTimeoutCallback,
        onNetworkNack: OnNetworkNackCallback): PendingInterestTable.Entry;

    /**
     * Find all entries from the pending interest table where data conforms to
     * the entry's interest selectors, remove the entries from the table, and add to
     * the entries list.
     * @param {Data} data The incoming Data packet to find the interest for.
     * @param {Array<PendingInterestTable.Entry>} entries Add matching
     * PendingInterestTable.Entry from the pending interest table. The caller should
     * pass in an empty array.
     */
    extractEntriesForExpressedInterest(data: Data, entries: PendingInterestTable.Entry[]);

    /**
     * Find all entries from the pending interest table where the OnNetworkNack
     * callback is not null and the entry's interest is the same as the given
     * interest, remove the entries from the table, and add to the entries list.
     * (We don't remove the entry if the OnNetworkNack callback is null so that
     * OnTimeout will be called later.) The interests are the same if their default
     * wire encoding is the same (which has everything including the name, nonce,
     * link object and selectors).
     * @param {Interest} interest The Interest to search for (typically from a Nack
     * packet).
     * @param {Array<PendingInterestTable.Entry>} entries Add matching
     * PendingInterestTable.Entry from the pending interest table. The caller should
     * pass in an empty array.
     */
    extractEntriesForNackInterest(interest: Interest, entries: PendingInterestTable.Entry);

    /**
     * Remove the pending interest entry with the pendingInterestId from the pending
     * interest table. This does not affect another pending interest with a
     * different pendingInterestId, even if it has the same interest name.
     * If there is no entry with the pendingInterestId, do nothing.
     * @param {number} pendingInterestId The ID returned from expressInterest.
     */
    removePendingInterest(pendingInterestId: number);

}

export namespace PendingInterestTable {
    class Entry {
        /**
         * PendingInterestTable.Entry holds the callbacks and other fields for an entry
         * in the pending interest table.
         * Create a new Entry with the given fields. Note: You should not call this
         * directly but call PendingInterestTable.add.
         * @constructor
         */
        constructor(pendingInterestId: number, interest: Interest, onData: OnDataCallback,
                    onTimeout: OnTimeoutCallback, onNetworkNack: OnNetworkNackCallback);

        /**
         * Get the pendingInterestId given to the constructor.
         * @return {number} The pendingInterestId.
         */
        getPendingInterestId(): number;

        /**
         * Get the interest given to the constructor (from Face.expressInterest).
         * @return {Interest} The interest. NOTE: You must not change the interest
         * object - if you need to change it then make a copy.
         */
        getInterest(): Interest;

        /**
         * Get the OnData callback given to the constructor.
         * @return {function} The OnData callback.
         */
        getOnData(): OnDataCallback;

        /**
         * Get the OnNetworkNack callback given to the constructor.
         * @return {function} The OnNetworkNack callback.
         */
        getOnNetworkNack(): OnNetworkNackCallback;

        /**
         * Call onTimeout_ (if defined). This ignores exceptions from the call to
         * onTimeout_.
         */
        callTimeout();

        /**
         * Call setTimeout(callback, milliseconds) and remember the timer ID. If the
         * timer ID has already been set on a prevous call, do nothing.
         */
        setTimeout(callback: OnTimeoutCallback, milliseconds: number);

        /**
         * Clear the timeout timer and reset the timer ID.
         */
        clearTimeout();


    }

}