import {Name} from "../../name";
import {Data} from "../../data";
import {Blob, SyncPromise} from "../../util";
import {EncryptParams} from "./encrypt-params";

export class Encryptor {
    static NAME_COMPONENT_FOR: Name.Component;
    static NAME_COMPONENT_READ: Name.Component;
    static NAME_COMPONENT_SAMPLE: Name.Component;
    static NAME_COMPONENT_ACCESS: Name.Component;
    static NAME_COMPONENT_E_KEY: Name.Component;
    static NAME_COMPONENT_D_KEY: Name.Component;
    static NAME_COMPONENT_C_KEY: Name.Component;

    constructor(value: any);

    /**
     * Prepare an encrypted data packet by encrypting the payload using the key
     * according to the params. In addition, this prepares the encoded
     * EncryptedContent with the encryption result using keyName and params. The
     * encoding is set as the content of the data packet. If params defines an
     * asymmetric encryption algorithm and the payload is larger than the maximum
     * plaintext size, this encrypts the payload with a symmetric key that is
     * asymmetrically encrypted and provided as a nonce in the content of the data
     * packet. The packet's /<dataName>/ is updated to be <dataName>/FOR/<keyName>.
     * @param {Data} data The data packet which is updated.
     * @param {Blob} payload The payload to encrypt.
     * @param {Name} keyName The key name for the EncryptedContent.
     * @param {Blob} key The encryption key value.
     * @param {EncryptParams} params The parameters for encryption.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which fulfills when the data packet
     * is updated.
     */
    encryptDataPromise(data: Data, payload: Blob, keyName: Name, key: Blob, params: EncryptParams, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Prepare an encrypted data packet by encrypting the payload using the key
     * according to the params. In addition, this prepares the encoded
     * EncryptedContent with the encryption result using keyName and params. The
     * encoding is set as the content of the data packet. If params defines an
     * asymmetric encryption algorithm and the payload is larger than the maximum
     * plaintext size, this encrypts the payload with a symmetric key that is
     * asymmetrically encrypted and provided as a nonce in the content of the data
     * packet.
     * @param {Data} data The data packet which is updated.
     * @param {Blob} payload The payload to encrypt.
     * @param {Name} keyName The key name for the EncryptedContent.
     * @param {Blob} key The encryption key value.
     * @param {EncryptParams} params The parameters for encryption.
     * @throws Error If encryptPromise doesn't return a SyncPromise which is
     * already fulfilled.
     */
    encryptData(data: Data, payload: Blob, keyName: Name, key: Blob, params: EncryptParams): any;


}