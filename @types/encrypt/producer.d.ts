import {Name} from "../name";
import {Face} from "../face";
import {KeyChain} from "../key-chain";
import {ProducerDb} from "./producer-db";
import {Link} from "../link";
import {Data} from "../data";
import {EncryptError} from "./encrypt-error";
import {Blob} from "../util";
import {Exclude} from "../exclude";
import ExcludeEntry = Producer.ExcludeEntry;

export class Producer {
    /**
     * A Producer manages content keys used to encrypt a data packet in the
     * group-based encryption protocol.
     * Create a Producer to use the given ProducerDb, Face and other values.
     *
     * A producer can produce data with a naming convention:
     *   /<prefix>/SAMPLE/<dataType>/[timestamp]
     *
     * The produced data packet is encrypted with a content key,
     * which is stored in the ProducerDb database.
     *
     * A producer also needs to produce data containing a content key
     * encrypted with E-KEYs. A producer can retrieve E-KEYs through the face,
     * and will re-try for at most repeatAttemps times when E-KEY retrieval fails.
     *
     * @param {Name} prefix The producer name prefix. This makes a copy of the Name.
     * @param {Name} dataType The dataType portion of the producer name. This makes
     * a copy of the Name.
     * @param {Face} face The face used to retrieve keys.
     * @param {KeyChain} keyChain The keyChain used to sign data packets.
     * @param {ProducerDb} database The ProducerDb database for storing keys.
     * @param {number} repeatAttempts (optional) The maximum retry for retrieving
     * keys. If omitted, use a default value of 3.
     * @param {Link} keyRetrievalLink (optional) The Link object to use in Interests
     * for key retrieval. This makes a copy of the Link object. If the Link object's
     * getDelegations().size() is zero, don't use it. If omitted, don't use a Link
     * object.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(prefix: Name, dataType: Name, face: Face, keyChain: KeyChain, database: ProducerDb,
                repeatAttempts?: number, keyRetrievalLink?: Link);

    /**
     * Create the content key corresponding to the timeSlot. This first checks if
     * the content key exists. For an existing content key, this returns the
     * content key name directly. If the key does not exist, this creates one and
     * encrypts it using the corresponding E-KEYs. The encrypted content keys are
     * passed to the onEncryptedKeys callback.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @param {function} onEncryptedKeys If this creates a content key, then this
     * calls onEncryptedKeys(keys) where keys is a list of encrypted content key
     * Data packets. If onEncryptedKeys is null, this does not use it.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onContentKeyName This calls onContentKeyName(contentKeyName)
     * with the content key name for the time slot. If onContentKeyName is null,
     * this does not use it. (A callback is needed because of async database
     * operations.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) This calls onError(errorCode, message)
     * for an error, where errorCode is from EncryptError.ErrorCode and message is a
     * string. If omitted, use a default callback which does nothing.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     */
    createContentKey(timeSlot: number, onEncryptedKeys: (keys: Data[]) => any,
                     onContentKeyName: (contentKeyName: Name) => any,
                     onError?: (errorCode: EncryptError.ErrorCode, message: string) => any);

    /**
     * Encrypt the given content with the content key that covers timeSlot, and
     * update the data packet with the encrypted content and an appropriate data
     * name.
     * @param {Data} data An empty Data object which is updated.
     * @param {number} timeSlot The time slot as milliseconds since Jan 1, 1970 UTC.
     * @param {Blob} content The content to encrypt.
     * @param {function} onComplete This calls onComplete() when the data packet has
     * been updated.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) This calls onError(errorCode, message)
     * for an error, where errorCode is from EncryptError.ErrorCode and message is a
     * string. If omitted, use a default callback which does nothing.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     */
    produce(data: Data, timeSlot: number, content: Blob, onComplete: () => any,
            onError?: (errorCode: EncryptError.ErrorCode, message: string) => any);

    /**
     * Create a list of ExcludeEntry from the Exclude object.
     * @param {Exclude} exclude The Exclude object to read.
     * @return {Array<ExcludeEntry>} A new array of ExcludeEntry.
     */
    static getExcludeEntries(exclude: Exclude): ExcludeEntry[];

    /**
     * Set the Exclude object from the array of ExcludeEntry.
     * @param {Exclude} exclude The Exclude object to update.
     * @param {Array<ExcludeEntry>} entries The array of ExcludeEntry.
     */
    static setExcludeEntries(exclude: Exclude, entries: ExcludeEntry[]);

    /**
     * Get the latest entry in the array whose component_ is less than or equal to
     * component.
     * @param {Array<ExcludeEntry>} entries The array of ExcludeEntry.
     * @param {Name.Component} component The component to compare.
     * @return {number} The index of the found entry, or -1 if not found.
     */
    static findEntryBeforeOrAt(entries: ExcludeEntry[], component: Name.Component);

    /**
     * Exclude all components in the range beginning at "from".
     * @param {Exclude} exclude The Exclude object to update.
     * @param {Name.Component} from The first component in the exclude range.
     */
    static excludeAfter(exclude: Exclude, from: Name.Component);

    /**
     * Exclude all components in the range ending at "to".
     * @param {Exclude} exclude The Exclude object to update.
     * @param {Name.Component} to The last component in the exclude range.
     */
    static excludeBefore(exclude: Exclude, to: Name.Component);

    /**
     * Exclude all components in the range beginning at "from" and ending at "to".
     * @param {Exclude} exclude The Exclude object to update.
     * @param {Name.Component} from The first component in the exclude range.
     * @param {Name.Component} to The last component in the exclude range.
     */
    static excludeRange(exclude: Exclude, from: Name.Component, to: Name.Component);


}

export namespace Producer {
    class ExcludeEntry {
        /**
         * Create a new ExcludeEntry.
         * @param {Name.Component} component
         * @param {boolean} anyFollowsComponent
         */
        constructor(component: Name.Component, anyFollowsComponent: boolean);
    }
}