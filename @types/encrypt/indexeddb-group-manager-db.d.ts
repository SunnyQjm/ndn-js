import {GroupManagerDb} from "./group-manager-db";

export class IndexedDbGroupManagerDb extends GroupManagerDb {
    /**
     * IndexedDbGroupManagerDb extends GroupManagerDb to implement the storage of
     * data used by the GroupManager using the browser's IndexedDB service.
     * Create an IndexedDbGroupManagerDb to use the given IndexedDB database name.
     * @param {string} databaseName IndexedDB database name.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(databaseName: string);


}