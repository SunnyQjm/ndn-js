import {InterestFilter} from "../interest-filter";
import {Face, OnInterestCallback} from "../face";
import {Interest} from "../interest";

export class InterestFilterTable {
    /**
     * Add a new entry to the table.
     * @param {number} interestFilterId The ID from Node.getNextEntryId().
     * @param {InterestFilter} filter The InterestFilter for this entry.
     * @param {function} onInterest The callback to call.
     * @param {Face} face The face on which was called registerPrefix or
     * setInterestFilter which is passed to the onInterest callback.
     */
    setInterestFilter(interestFilterId: number, filter: InterestFilter, onInterest: OnInterestCallback, face: Face);

    /**
     * Find all entries from the interest filter table where the interest conforms
     * to the entry's filter, and add to the matchedFilters list.
     * @param {Interest} interest The interest which may match the filter in
     * multiple entries.
     * @param {Array<InterestFilterTable.Entry>} matchedFilters Add each matching
     * InterestFilterTable.Entry from the interest filter table.  The caller should
     * pass in an empty array.
     */
    getMatchedFilters(interest: Interest, matchedFilters: InterestFilterTable.Entry);

    /**
     * Remove the interest filter entry which has the interestFilterId from the
     * interest filter table. This does not affect another interest filter with a
     * different interestFilterId, even if it has the same prefix name. If there is
     * no entry with the interestFilterId, do nothing.
     * @param {number} interestFilterId The ID returned from setInterestFilter.
     */
    unsetInterestFilter(interestFilterId: number);
}

export namespace InterestFilterTable {

    class Entry {
        /**
         * InterestFilterTable.Entry holds an interestFilterId, an InterestFilter and
         * the OnInterestCallback with its related Face.
         * Create a new Entry with the given values.
         * @param {number} interestFilterId The ID from getNextEntryId().
         * @param {InterestFilter} filter The InterestFilter for this entry.
         * @param {function} onInterest The callback to call.
         * @param {Face} face The face on which was called registerPrefix or
         * setInterestFilter which is passed to the onInterest callback.
         * @constructor
         */
        constructor(interestFilterId: number, filter: InterestFilter, onInterest: OnInterestCallback, face: Face);

        /**
         * Get the interestFilterId given to the constructor.
         * @return {number} The interestFilterId.
         */
        getInterestFilterId(): number;

        /**
         * Get the InterestFilter given to the constructor.
         * @return {InterestFilter} The InterestFilter.
         */
        getFilter(): InterestFilter;

        /**
         * Get the onInterest callback given to the constructor.
         * @return {function} The onInterest callback.
         */
        getOnInterest(): OnInterestCallback;

        /**
         * Get the Face given to the constructor.
         * @return {Face} The Face.
         */
        getFace(): Face;
    }
}