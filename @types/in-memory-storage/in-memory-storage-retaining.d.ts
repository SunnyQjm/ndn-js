import {Data} from "../data";
import {Interest} from "../interest";

export class InMemoryStorageRetaining {
    /**
     * InMemoryStorageRetaining provides an application cache with in-memory
     * storage, of which no eviction policy will be employed. Entries will only be
     * evicted by explicit application control.
     * Note: In ndn-cxx, this class is called InMemoryStoragePersistent, but
     * "persistent" misleadingly sounds like persistent on-disk storage.
     *
     * Create an InMemoryStorageRetaining.
     * @constructor
     */
    constructor();

    /**
     * Insert a Data packet. If a Data packet with the same name, including the
     * implicit digest, already exists, replace it.
     * @param {Data} data The packet to insert, which is copied.
     */
    insert(data: Data);

    /**
     * Find the best match Data for an Interest.
     * @param {Interest} interest The Interest with the Name of the Data packet to
     * find.
     * @returns {Data} The best match if any, otherwise None. You should not modify
     * the returned object. If you need to modify it then you must make a copy.
     */
    find(interest: Interest);

    /**
     * Get the number of packets stored in the in-memory storage.
     * @returns {number} The number of packets.
     */
    size(): number;
}