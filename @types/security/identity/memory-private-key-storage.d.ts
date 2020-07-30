import {PrivateKeyStorage} from "./private-key-storage";
import {Name} from "../../name";

export class MemoryPrivateKeyStorage extends PrivateKeyStorage{
    /**
     * MemoryPrivateKeyStorage class extends PrivateKeyStorage to implement private
     * key storage in memory.
     * @constructor
     */
    constructor();

    /**
     * Set the public key for the keyName.
     * @param {Name} keyName The key name.
     * @param {number} keyType The KeyType, such as KeyType.RSA.
     * @param {Buffer} publicKeyDer The public key DER byte array.
     */
    setPublicKeyForKeyName(keyName: Name, keyType: number, publicKeyDer: Buffer);

    /**
     * Set the private key for the keyName.
     * @param {Name} keyName The key name.
     * @param {number} keyType The KeyType, such as KeyType.RSA.
     * @param {Buffer} privateKeyDer The private key DER byte array.
     */
    setPrivateKeyForKeyName(keyName: Name, keyType: number, privateKeyDer: Buffer);

    /**
     * Set the public and private key for the keyName.
     * @param {Name} keyName The key name.
     * @param {number} keyType The KeyType, such as KeyType.RSA.
     * @param {Buffer} publicKeyDer The public key DER byte array.
     * @param {Buffer} privateKeyDer The private key DER byte array.
     */
    setKeyPairForKeyName(keyName: Name, keyType: number, publicKeyDer: Buffer, privateKeyDer: Buffer);
}