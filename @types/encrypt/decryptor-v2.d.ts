import {PibKey} from "../security/pib/pib-key";
import {Validator} from "../security/v2/validator";
import {KeyChain} from "../key-chain";
import {Face} from "../face";
import {EncryptedContent} from "./encrypted-content";
import {Blob} from "../util";
import {EncryptError} from "./encrypt-error";

export class DecryptorV2 {
    /**
     * DecryptorV2 decrypts the supplied EncryptedContent element, using
     * asynchronous operations, contingent on the retrieval of the CK Data packet,
     * the KDK, and the successful decryption of both of these. For the meaning of
     * "KDK", etc. see:
     * https://github.com/named-data/name-based-access-control/blob/new/docs/spec.rst
     *
     * Create a DecryptorV2 with the given parameters.
     * @param {PibKey} credentialsKey The credentials key to be used to retrieve and
     * decrypt the KDK.
     * @param {Validator} validator The validation policy to ensure the validity of
     * the KDK and CK.
     * @param {KeyChain} keyChain The KeyChain that will be used to decrypt the KDK.
     * @param {Face} face The Face that will be used to fetch the CK and KDK.
     * @constructor
     */
    constructor(credentialsKey: PibKey, validator: Validator, keyChain: KeyChain, face: Face);

    shutdown(): void;

    /**
     * Asynchronously decrypt the encryptedContent.
     * @param {EncryptedContent} encryptedContent The EncryptedContent to decrypt,
     * which must have a KeyLocator with a KEYNAME and and initial vector. This does
     * not copy the EncryptedContent object. If you may change it later, then pass
     * in a copy of the object.
     * @param {function} onSuccess On successful decryption, this calls
     * onSuccess(plainData) where plainData is the decrypted Blob.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError On failure, this calls onError(errorCode, message)
     * where errorCode is from EncryptError.ErrorCode, and message is an error
     * string.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     */
    decrypt(encryptedContent: EncryptedContent, onSuccess: (plainData: Blob) => any, onError: (errorCode: EncryptError.ErrorCode, message: string) => any);

}

export namespace DecryptorV2 {
    class ContentKey {

    }

    namespace ContentKey {
        class PendingDecrypt {
            constructor(encryptedContent: EncryptedContent, onSuccess: (plainData: Blob) => any, onError: (errorCode: EncryptError.ErrorCode, message: string) => any);
        }
    }
}