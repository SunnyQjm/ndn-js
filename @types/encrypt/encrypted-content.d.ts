/**
 * An EncryptedContent holds an encryption type, a payload and other fields
 * representing encrypted content.
 * @param {EncryptedContent} (optional) If value is another EncryptedContent
 * then copy it. If value is omitted then create an EncryptedContent with
 * unspecified values.
 * @note This class is an experimental feature. The API may change.
 * @constructor
 */
import {KeyLocator} from "../key-locator";
import {Name} from "../name";
import {Blob} from "../util";
import {WireFormat} from "../encoding/wire-format";

export class EncryptedContent {
    /**
     * Get the algorithm type from EncryptAlgorithmType.
     * @return {number} The algorithm type from EncryptAlgorithmType, or null if
     * not specified.
     */
    getAlgorithmType(): number;

    /**
     * Get the key locator.
     * @return {KeyLocator} The key locator. If not specified, getType() is null.
     */
    getKeyLocator(): KeyLocator;

    /**
     * Check that the key locator type is KEYNAME and return the key Name.
     * @returns {Name} The key Name.
     * @throws Error if the key locator type is not KEYNAME.
     */
    getKeyLocatorName(): Name;

    /**
     * Check if the initial vector is specified.
     * @return {boolean} True if the initial vector is specified.
     */
    hasInitialVector(): boolean;

    /**
     * Get the initial vector.
     * @return {Blob} The initial vector. If not specified, isNull() is true.
     */
    getInitialVector(): Blob;

    /**
     * Get the payload.
     * @return {Blob} The payload. If not specified, isNull() is true.
     */
    getPayload(): Blob;

    /**
     * Get the encrypted payload key.
     * @return {Blob} The encrypted payload key. If not specified, isNull() is true.
     */
    getPayloadKey(): Blob;

    /**
     * Set the algorithm type.
     * @param {number} algorithmType The algorithm type from EncryptAlgorithmType.
     * If not specified, set to null.
     * @return {EncryptedContent} This EncryptedContent so that you can chain calls
     * to update values.
     */
    setAlgorithmType(algorithmType: number): EncryptedContent;

    /**
     * Set the key locator.
     * @param {KeyLocator} keyLocator The key locator. This makes a copy of the
     * object. If not specified, set to the default KeyLocator().
     * @return {EncryptedContent} This EncryptedContent so that you can chain calls
     * to update values.
     */
    setKeyLocator(keyLocator: KeyLocator): EncryptedContent;

    /**
     * Set the key locator type to KeyLocatorType.KEYNAME and set the key Name.
     * @param {Name} keyName The key locator Name, which is copied.
     * @return {EncryptedContent} This EncryptedContent so that you can chain calls
     * to update values.
     */
    setKeyLocatorName(keyName: Name): EncryptedContent;

    /**
     * Set the initial vector.
     * @param {Blob} initialVector The initial vector. If not specified, set to the
     * default Blob() where isNull() is true.
     * @return {EncryptedContent} This EncryptedContent so that you can chain calls
     * to update values.
     */
    setInitialVector(initialVector: Blob): EncryptedContent;

    /**
     * Set the encrypted payload.
     * @param {Blob} payload The payload. If not specified, set to the default Blob()
     * where isNull() is true.
     * @return {EncryptedContent} This EncryptedContent so that you can chain calls
     * to update values.
     */
    setPayload(payload: Blob): EncryptedContent;

    /**
     * Set the encrypted payload key.
     * @param {Blob} payloadKey The encrypted payload key. If not specified, set to
     * the default Blob() where isNull() is true.
     * @return {EncryptedContent} This EncryptedContent so that you can chain calls
     * to update values.
     */
    setPayloadKey(payloadKey: Blob): EncryptedContent;

    /**
     * Set all the fields to indicate unspecified values.
     */
    clear(): void;

    /**
     * Encode this to an EncryptedContent v1 wire encoding.
     * @param {WireFormat} wireFormat (optional) A WireFormat object  used to encode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     * @return {Blob} The encoded buffer in a Blob object.
     */
    wireEncode(wireFormat?: WireFormat): Blob;

    /**
     * Encode this to an EncryptedContent v2 wire encoding.
     * @param {WireFormat} wireFormat (optional) A WireFormat object  used to encode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     * @return {Blob} The encoded buffer in a Blob object.
     */
    wireEncodeV2(wireFormat?: WireFormat): Blob;

    /**
     * Decode the input as an EncryptedContent v1 using a particular wire format and
     * update this EncryptedContent.
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to decode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     */
    wireDecode(input: Blob | Buffer, wireFormat?: WireFormat): void;

    /**
     * Decode the input as an EncryptedContent v2 using a particular wire format and
     * update this EncryptedContent.
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to decode
     * this object. If omitted, use WireFormat.getDefaultWireFormat().
     */
    wireDecodeV2(input: Blob | Buffer, wireFormat?: WireFormat): void;
}