import {ConsumerDb} from "./consumer-db";
import {Name} from "../name";
import {Blob, SyncPromise} from "../util";

export class IndexedDbConsumerDb extends ConsumerDb {
    /**
     * IndexedDbConsumerDb extends ConsumerDb to implement the storage of decryption
     * keys for the consumer using the browser's IndexedDB service.
     * Create an IndexedDbConsumerDb to use the given IndexedDB database name.
     * @param {string} databaseName IndexedDB database name.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(databaseName: string);
}