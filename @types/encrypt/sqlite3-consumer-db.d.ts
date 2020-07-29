import {ConsumerDb} from "./consumer-db";

export class Sqlite3ConsumerDb extends ConsumerDb {
    /**
     * Sqlite3ConsumerDb extends ConsumerDb to implement the storage of decryption
     * keys for the consumer using SQLite3.
     * Create a Sqlite3ConsumerDb to use the given SQLite3 file.
     * @param {string} databaseFilePath The path of the SQLite file.
     * @throws ConsumerDb.Error for a database error.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(databaseFilePath: string);
}