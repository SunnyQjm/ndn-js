import {Face} from "../face";
import {KeyChain} from "../key-chain";
import {Name} from "../name";
import {ConsumerDb} from "./consumer-db";
import {Link} from "../link";
import {Data} from "../data";
import {Blob, SyncPromise} from "../util";
import {EncryptError} from "./encrypt-error";

/**
 * A Consumer manages fetched group keys used to decrypt a data packet in the
 * group-based encryption protocol.
 * Create a Consumer to use the given ConsumerDb, Face and other values.
 * @param {Face} face The face used for data packet and key fetching.
 * @param {KeyChain} keyChain The keyChain used to verify data packets.
 * @param {Name} groupName The reading group name that the consumer belongs to.
 * This makes a copy of the Name.
 * @param {Name} consumerName The identity of the consumer. This makes a copy of
 * the Name.
 * @param {ConsumerDb} database The ConsumerDb database for storing decryption
 * keys.
 * @param {Link} cKeyLink (optional) The Link object to use in Interests for
 * C-KEY retrieval. This makes a copy of the Link object. If the Link object's
 * getDelegations().size() is zero, don't use it. If omitted, don't use a Link
 * object.
 * @param {Link} dKeyLink (optional) The Link object to use in Interests for
 * D-KEY retrieval. This makes a copy of the Link object. If the Link object's
 * getDelegations().size() is zero, don't use it. If omitted, don't use a Link
 * object.
 * @note This class is an experimental feature. The API may change.
 * @constructor
 */
export class Consumer {
    constructor(face: Face, keyChain: KeyChain, groupName: Name, consumerName: Name, database: ConsumerDb, cKeyLink: Link, dKeyLink: Link);

    /**
     * Express an Interest to fetch the content packet with contentName, and
     * decrypt it, fetching keys as needed.
     * @param {Name} contentName The name of the content packet.
     * @param {function} onConsumeComplete When the content packet is fetched and
     * decrypted, this calls onConsumeComplete(contentData, result) where
     * contentData is the fetched Data packet and result is the decrypted plain
     * text Blob.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError This calls onError(errorCode, message) for an error,
     * where errorCode is an error code from EncryptError.ErrorCode.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param link {Link} (optional) The Link object to use in Interests for data
     * retrieval. This makes a copy of the Link object. If the Link object's
     * getDelegations().size() is zero, don't use it. If omitted, don't use a Link
     * object.
     */
    consume(contentName: Name, onConsumeComplete: (contentData: Data, result: Blob) => any,
            onError: (errorCode: EncryptError.ErrorCode, message: string) => any, link?: Link);

    /**
     * Set the group name.
     * @param {Name} groupName The reading group name that the consumer belongs to.
     * This makes a copy of the Name.
     */
    setGroup(groupName: Name);

    /**
     * Add a new decryption key with keyName and keyBlob to the database.
     * @param {Name} keyName The key name.
     * @param {Blob} keyBlob The encoded key.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the key is added,
     * or that is rejected with Error if the consumer name is not a prefix of the
     * key name, or ConsumerDb.Error if a key with the same keyName already exists,
     * or other database error.
     */
    addDecryptionKeyPromise(keyName: Name, keyBlob: Blob, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Add a new decryption key with keyName and keyBlob to the database.
     * @param {Name} keyName The key name.
     * @param {Blob} keyBlob The encoded key.
     * @param {function} onComplete (optional) This calls onComplete() when the key
     * is added. (Some database libraries only use a callback, so onComplete is
     * required to use these.)
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * where exception is Error if the consumer name is not a prefix of the key
     * name, or ConsumerDb.Error if a key with the same keyName already exists,
     * or other database error. If onComplete is defined but onError is undefined,
     * then this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     */
    addDecryptionKey(keyName: Name, keyBlob: Blob, onComplete?: () => any, onError?: (err: any) => any);

}

export namespace Consumer {
    class ConsumerError {
        constructor(errorCode: number, message: string);

        /**
         * If exception is a ConsumerError, then call onError with the errorCode and
         * message, otherwise call onError with ErrorCode.General.
         */
        static callOnError(onError: (err: any) => any, exception: any, messagePrefix: string);
    }

    class Error {
        constructor(errorCode: number, message: string);

        /**
         * If exception is a ConsumerError, then call onError with the errorCode and
         * message, otherwise call onError with ErrorCode.General.
         */
        static callOnError(onError: (err: any) => any, exception: any, messagePrefix: string);
    }
}