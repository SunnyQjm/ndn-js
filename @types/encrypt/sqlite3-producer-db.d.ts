import {ProducerDb} from "./producer-db";

export class Sqlite3ProducerDb extends ProducerDb {
    /**
     * Sqlite3ProducerDb extends ProducerDb to implement storage of keys for the
     * producer using SQLite3. It contains one table that maps time slots (to the
     * nearest hour) to the content key created for that time slot.
     * Create a Sqlite3ProducerDb to use the given SQLite3 file.
     * @param {string} databaseFilePath The path of the SQLite file.
     * @throws ProducerDb.Error for a database error.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(databaseFilePath: string);
}