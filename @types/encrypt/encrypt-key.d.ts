import {Blob} from "../util";

/**
 * An EncryptKey supplies the key for encrypt.
 * Create an EncryptKey with the given key value.
 * @param {Blob|EncryptKey} value If value is another EncryptKey then copy it.
 * Otherwise, value is the key value.
 * @note This class is an experimental feature. The API may change.
 * @constructor
 */
export class EncryptKey {
    /**
     * Get the key value.
     * @return {Blob} The key value.
     */
    getKeyBits(): Blob;
}