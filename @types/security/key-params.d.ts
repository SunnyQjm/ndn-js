import {KeyType} from "./security-types";
import {KeyIdType} from "./key-id-type";

/**
 * KeyParams is a base class for key parameters. This also defines the
 * subclasses which are used to store parameters for key generation.
 *
 * Create a key generation parameter. This constructor is protected and used by
 * subclasses.
 * @param {number} keyType: The type for the created key, as an int from the
 * KeyType enum.
 * @param (number|Name.Component) keyIdTypeOrKeyId: If this is an int from the
 * KeyIdType enum, it is the method for how the key id should be generated,
 * which must not be KeyIdType.USER_SPECIFIED. If this is a Name.Component, it
 * is the user-specified key ID, in which case this sets the keyIdType to
 * KeyIdType.USER_SPECIFIED. (The keyId must not be empty.)
 * @throws Error if keyIdTypeOrKeyId is a KeyIdType and it is
 * KeyIdType.USER_SPECIFIED, or if keyIdTypeOrKeyId is a Name.Component and it
 * is empty.
 * @constructor
 */
export class KeyParams {
    getKeyType(): KeyType;

    getKeyIdType(): KeyIdType;

    getKeyId(): number;

    setKeyId(keyId: number): void;
}

/**
 * Possible forms of the constructor are:
 * RsaKeyParams(keyId, size)
 * RsaKeyParams(keyId)
 * RsaKeyParams(size, keyIdType)
 * RsaKeyParams(size)
 * RsaKeyParams()
 * @constructor
 */
export class RsaKeyParams extends KeyParams {
    getKeySize(): number;

    static getDefaultSize(): number;

    static getType(): KeyType;
}

/**
 * Possible forms of the constructor are:
 * EcKeyParams(keyId, size)
 * EcKeyParams(keyId)
 * EcKeyParams(size, keyIdType)
 * EcKeyParams(size)
 * EcKeyParams()
 * @constructor
 */
export class EcKeyParams extends KeyParams {
    getKeySize(): number;

    static getDefaultSize(): number;

    static getType(): KeyType;
}

/**
 * @deprecated Use EcKeyParams .
 */
export class EcdsaKeyParams extends KeyParams {
    getKeySize(): number;

    static getDefaultSize(): number;

    static getType(): KeyType;
}

/**
 * Possible forms of the constructor are:
 * AesKeyParams(keyId, size)
 * AesKeyParams(keyId)
 * AesKeyParams(size, keyIdType)
 * AesKeyParams(size)
 * AesKeyParams()
 * @constructor
 */
export class AesKeyParams extends KeyParams {
    getKeySize(): number;

    static getDefaultSize(): number;

    static getType(): KeyType;
}