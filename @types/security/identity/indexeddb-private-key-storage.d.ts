import {PrivateKeyStorage} from "./private-key-storage";
import {Name} from "../../name";

export class IndexedDbPrivateKeyStorage extends PrivateKeyStorage {
    /**
     * IndexedDbPrivateKeyStorage extends PrivateKeyStorage to implement private key
     * storage using the browser's IndexedDB service.
     * @constructor
     */
    constructor();

    /**
     * Transform the key name into the base64 encoding of the hash (the same as in
     * FilePrivateKeyStorage without the file name extension).
     */
    static transformName(keyName: Name): string;
}