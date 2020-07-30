import {Name} from "../../name";
import {KeyClass} from "../security-types";
import {PrivateKeyStorage} from "./private-key-storage";

export class FilePrivateKeyStorage extends PrivateKeyStorage{
    /**
     * FilePrivateKeyStorage works with NFD's default private key storage, the files
     * stored in .ndn/ndnsec-tpm-file. This library will not be available from the
     * browser
     * @param {string} nonDefaultTpmPath if desired, override the default TPM path (i.e. .ndn/ndnsec-tpm-file)
     * @constructor
     */
    constructor(nonDefaultTpmPath: string);

    /**
     * Delete all keys with this name. If the key doesn't exist, do nothing.
     * @param {Name} keyName The name of the key pair.
     */
    deleteKey(keyName: Name);

    /**
     * Write to a key file. If keyClass is PRIVATE, then also update mapping.txt.
     * @param {Name} keyName
     * @param {KeyClass} keyClass [PUBLIC, PRIVATE, SYMMETRIC]
     * @param {Buffer} bytes
     * @throws Error if the file cannot be written to
     */
    write(keyName: Name, keyClass: KeyClass, bytes: Buffer);

    /**
     * Read from a key file
     * @param {Name} keyName
     * @param {number} keyClass An int from KeyClass.
     * @return {Buffer} key bytes
     * @throws Error if the file cannot be read from
     */
    read(keyName: Name, keyClass: number): Buffer;

    /**
     * Transform a key name to its hashed file path.
     * @param {string} keyNameUri The key name URI which is transformed to a file path.
     * @param {string} extension The file name extension. You can use
     * KeyClassExtensions[keyClass].
     * @return {string} The hashed key file path.
     */
    nameTransform(keyNameUri: string, extension: string): string;

    /**
     * Use nameTransform to get the file path for keyName (without the extension)
     * and also add to the mapping.txt file.
     * @param {string} keyNameUri The key name URI which is transformed to a file path.
     * @return {string} The key file path without the extension.
     */
    maintainMapping(keyNameUri: string): string;
}