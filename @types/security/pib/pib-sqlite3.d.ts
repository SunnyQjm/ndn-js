export class PibSqlite3 {
    /**
     * PibSqlite3 extends PibImpl and is used by the Pib class as an implementation
     * of a PIB based on an SQLite3 database. All the contents in the PIB are stored
     * in an SQLite3 database file. This provides more persistent storage than
     * PibMemory.
     *
     * Create a new PibSqlite3 to work with an SQLite3 file. This assumes that the
     * database directory does not contain a PIB database of an older version.
     *
     * @param {string} databaseDirectoryPath (optional) The directory where the
     * database file is located. If omitted, use $HOME/.ndn . If the directory does
     * not exist, this does not try to create it.
     * @param {string} databaseFilename (optional) The name if the database file in
     * the databaseDirectoryPath. If databaseFilename is supplied, then
     * databaseDirectoryPath must also be supplied. If omitted, use "pib.db".
     * @param {function} initialCheckPromise (optional) If supplied, then after
     * initializing the database this calls initialCheckPromise() which returns a
     * Promise that resolves when the initial check passes or is rejected for a
     * problem.
     * @constructor
     */
    constructor(databaseDirectoryPath?: string, databaseFilename?: string, initialCheckPromise?: () => Promise<any>);

    static getScheme(): string;

    /**
     * Get the default that the constructor uses if databaseDirectoryPath is
     * omitted. This does not try to create the directory.
     * @return {string} The default database directory path.
     */
    static getDefaultDatabaseDirectoryPath(): string;

    /**
     * Get the default database file path that the constructor uses if
     * databaseDirectoryPath and databaseFilename are omitted.
     * @return {string} The default database file path.
     */
    static getDefaultDatabaseFilePath(): string;


}