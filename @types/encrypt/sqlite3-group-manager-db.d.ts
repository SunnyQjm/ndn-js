import {GroupManagerDb} from "./group-manager-db";

export class Sqlite3GroupManagerDb extends GroupManagerDb {
    /**
     * Sqlite3GroupManagerDb extends GroupManagerDb to implement the storage of
     * data used by the GroupManager using the Node.js sqlite3 module.
     * Create a Sqlite3GroupManagerDb to use the given SQLite3 file.
     * @param {string} databaseFilePath The path of the SQLite file.
     * @throws GroupManagerDb.Error for a database error.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(databaseFilePath: string);
}