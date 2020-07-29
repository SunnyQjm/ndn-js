import {Blob} from "../util";

/**
 * A DecryptKey supplies the key for decrypt.
 * Create a DecryptKey with the given key value.
 * @param {Blob|DecryptKey} value If value is another DecryptKey then copy it.
 * Otherwise, value is the key value.
 * @note This class is an experimental feature. The API may change.
 * @constructor
 */
export class DecryptKey {
    /**
     * Get the key value.
     * @return {Blob} The key value.
     */
    getKeyBits(): Blob;
}