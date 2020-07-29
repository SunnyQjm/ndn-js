import {InterestFilterTable} from "./interest-filter-table";
import {Name} from "../name";

export class RegisteredPrefixTable {
    /**
     * A RegisteredPrefixTable is an internal class to hold a list of registered
     * prefixes with information necessary to remove the registration later.
     * @param {InterestFilterTable} interestFilterTable See removeRegisteredPrefix(),
     * which may call interestFilterTable.unsetInterestFilter().
     * @constructor
     */
    constructor(interestFilterTable: InterestFilterTable);

    /**
     * Add a new entry to the table. However, if removeRegisteredPrefix was already
     * called with the registeredPrefixId, don't add an entry and return false.
     * @param {number} registeredPrefixId The ID from Node.getNextEntryId().
     * @param {Name} prefix The name prefix.
     * @param {number} relatedInterestFilterId (optional) The related
     * interestFilterId for the filter set in the same registerPrefix operation. If
     * omitted, set to 0.
     * return {boolean} True if added an entry, false if removeRegisteredPrefix was
     * already called with the registeredPrefixId.
     */
    add(registeredPrefixId: number, prefix: Name, relatedInterestFilterId: number): boolean;

    /**
     * Remove the registered prefix entry with the registeredPrefixId from the
     * registered prefix table. This does not affect another registered prefix with
     * a different registeredPrefixId, even if it has the same prefix name. If an
     * interest filter was automatically created by registerPrefix, also call
     * interestFilterTable_.unsetInterestFilter to remove it.
     * If there is no entry with the registeredPrefixId, do nothing.
     * @param {number} registeredPrefixId The ID returned from registerPrefix.
     */
    removeRegisteredPrefix(registeredPrefixId: number);


}