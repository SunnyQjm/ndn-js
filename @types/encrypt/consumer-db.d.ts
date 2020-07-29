import {Name} from "../name";
import {Blob, SyncPromise} from "../util";

export class ConsumerDb {
    /**
     * ConsumerDb is a base class the storage of decryption keys for the consumer. A
     * subclass must implement the methods. For example, see Sqlite3ConsumerDb (for
     * Nodejs) or IndexedDbConsumerDb (for the browser).
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor();

    /**
     * Get the key with keyName from the database.
     * @param {Name} keyName The key name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that returns a Blob with the encoded
     * key (or an isNull Blob if cannot find the key with keyName), or that is
     * rejected with ConsumerDb.Error for a database error.
     */
    getKeyPromise(keyName: Name, useSync?: boolean): Promise<Blob> | SyncPromise;

    /**
     * Add the key with keyName and keyBlob to the database.
     * @param {Name} keyName The key name.
     * @param {Blob} keyBlob The encoded key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the key is added,
     * or that is rejected with ConsumerDb.Error if a key with the same keyName
     * already exists, or other database error.
     */
    addKeyPromise(keyName: Name, keyBlob: Blob, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete the key with keyName from the database. If there is no key with
     * keyName, do nothing.
     * @param {Name} keyName The key name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the key is deleted
     * (or there is no such key), or that is rejected with ConsumerDb.Error for a
     * database error.
     */
    deleteKeyPromise(keyName: Name, useSync?: boolean): Promise<any> | SyncPromise;
}

export namespace ConsumerDb {
    class ConsumerDbError {
        constructor(errorCode: Error);
    }

    class Error {
        constructor(errorCode: Error);
    }
}