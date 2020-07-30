import {Name} from "../../name";
import {Blob} from "../../util";
import {IdentityCertificate} from "../certificate";
import {IdentityStorage} from "./identity-storage";

export class BasicIdentityStorage extends IdentityStorage {
    /**
     * BasicIdentityStorage extends IdentityStorage to implement basic storage of
     * identity, public keys and certificates using the Node.js sqlite3 module.
     * Create a new BasicIdentityStorage to use the SQLite3 file in the default
     * location, or the optional given file.
     * @param {string} databaseFilePath (optional) The path of the SQLite3 file. If
     * omitted, use the default file (~/.ndn/ndnsec-public-info.db).
     * @param {function} initialCheckPromise (optional) If supplied, then after
     * initializing the database this calls initialCheckPromise() which returns a
     * Promise that resolves when the initial check passes or is rejected for a
     * problem.
     * @constructor
     */
    constructor(databaseFilePath?: string, initialCheckPromise?: () => Promise<any>);

    /**
     * Get the default directory that the constructor uses if databaseFilePath is
     * omitted. This does not try to create the directory.
     * @return {string} The default database directory path.
     */
    static getDefaultDatabaseDirectoryPath(): string;

    /**
     * Get the default database file path that the constructor uses if
     * databaseFilePath is omitted.
     * @return {string} The default database file path.
     */
    static getDefaultDatabaseFilePath(): string;

    /**
     * Retrieve the user's current home directory
     * @return {string} path to the user's home directory
     */
    static getUserHomePath(): string;

    static INIT_TPM_INFO_TABLE: string;
    static INIT_ID_TABLE1: string;
    static INIT_ID_TABLE2: string;
    static INIT_KEY_TABLE1: string;
    static INIT_KEY_TABLE2: string;
    static INIT_CERT_TABLE1: string;
    static INIT_CERT_TABLE2: string;
    static INIT_CERT_TABLE3: string;
}