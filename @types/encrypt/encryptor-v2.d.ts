import {Name} from "../name";
import {SigningInfo} from "../security/signing-info";
import {EncryptError} from "./encrypt-error";
import {Validator} from "../security/v2/validator";
import {KeyChain} from "../key-chain";
import {Face} from "../face";
import {Blob} from "../util";
import {EncryptedContent} from "./encrypted-content";

export class EncryptorV2 {

    static NAME_COMPONENT_ENCRYPTED_BY: Name.Component;
    static NAME_COMPONENT_NAC: Name.Component;
    static NAME_COMPONENT_KEK: Name.Component;
    static NAME_COMPONENT_KDK: Name.Component;
    static NAME_COMPONENT_CK: Name.Component;

    static RETRY_DELAY_AFTER_NACK_MS: number;
    static RETRY_DELAY_KEK_RETRIEVAL_MS: number;

    static AES_KEY_SIZE: number;
    static AES_IV_SIZE: number;
    static N_RETRIES: number;

    static DEFAULT_CK_FRESHNESS_PERIOD_MS: number;


    /**
     * EncryptorV2 encrypts the requested content for name-based access control (NAC)
     * using security v2. For the meaning of "KEK", etc. see:
     * https://github.com/named-data/name-based-access-control/blob/new/docs/spec.rst
     *
     * Create an EncryptorV2 with the given parameters. This uses the face to
     * register to receive Interests for the prefix {ckPrefix}/CK.
     * @param {Name} accessPrefix The NAC prefix to fetch the Key Encryption Key
     * (KEK) (e.g., /access/prefix/NAC/data/subset). This copies the Name.
     * @param {Name} ckPrefix The prefix under which Content Keys (CK) will be
     * generated. (Each will have a unique version appended.) This copies the Name.
     * @param {SigningInfo} ckDataSigningInfo The SigningInfo parameters to sign the
     * Content Key (CK) Data packet. This copies the SigningInfo.
     * @param {function} onError On failure to create the CK data (failed to fetch
     * the KEK, failed to encrypt with the KEK, etc.), this calls
     * onError(errorCode, message) where errorCode is from
     * EncryptError.ErrorCode, and message is an error string. The encrypt
     * method will continue trying to retrieve the KEK until success (with each
     * attempt separated by RETRY_DELAY_KEK_RETRIEVAL_MS) and onError may be
     * called multiple times.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {Validator} validator The validation policy to ensure correctness of
     * the KEK.
     * @param {KeyChain} keyChain The KeyChain used to sign Data packets.
     * @param {Face} face The Face that will be used to fetch the KEK and publish CK data.
     * @constructor
     */
    constructor(accessPrefix: Name, ckPrefix: Name, ckDataSigningInfo: SigningInfo,
                onError: (errorCode: EncryptError.ErrorCode, message: string) => any, validator: Validator,
                keyChain: KeyChain, face: Face);

    shutdown(): void;

    /**
     * Encrypt the plainData using the existing Content Key (CK) and return a new
     * EncryptedContent.
     * @param {Buffer|Blob} plainData The data to encrypt.
     * @return {EncryptedContent} The new EncryptedContent.
     */
    encrypt(plainData: Buffer | Blob): EncryptedContent;

    /**
     * Create a new Content Key (CK) and publish the corresponding CK Data packet.
     * This uses the onError given to the constructor to report errors.
     */
    regenerateCk();

    /**
     * Get the number of packets stored in in-memory storage.
     * @return {number} The number of packets.
     */
    size(): number;
}