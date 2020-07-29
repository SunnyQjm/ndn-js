import {ProducerDb} from "./producer-db";

export class IndexedDbProducerDb extends ProducerDb {
    /**
     * IndexedDbProducerDb extends ProducerDb to implement storage of keys for the
     * producer using the browser's IndexedDB service. It contains one table that
     * maps time slots (to the nearest hour) to the content key created for that
     * time slot.
     * Create an IndexedDbProducerDb to use the given IndexedDB database name.
     * @param {string} databaseName IndexedDB database name.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(databaseName: string);
}