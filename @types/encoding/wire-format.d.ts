import {Name} from "../name";
import {Blob} from "../util";
import {Interest} from "../interest";
import {Data} from "../data";
import {ControlParameters} from "../control-parameters";
import {ControlResponse} from "../control-response";
import {Signature} from "../signature";
import {LpPacket} from "../lp/lp-packet";
import {DelegationSet} from "../delegation-set";
import {EncryptedContent} from "../encrypt/encrypted-content";

export abstract class WireFormat {
    /**
     * Encode name and return the encoding.  Your derived class should override.
     * @param {Name} name The Name to encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeName(name: Name): Blob;

    /**
     * Decode input as a name and set the fields of the Name object.
     * Your derived class should override.
     * @param {Name} name The Name object whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    decodeName(name: Name, input: Buffer, copy?: boolean): void;

    /**
     * Encode interest and return the encoding.  Your derived class should override.
     * @param {Interest} interest The Interest to encode.
     * @return {object} An associative array with fields
     * (encoding, signedPortionBeginOffset, signedPortionEndOffset) where encoding
     * is a Blob containing the encoding, signedPortionBeginOffset is the offset in
     * the encoding of the beginning of the signed portion, and
     * signedPortionEndOffset is the offset in the encoding of the end of the signed
     * portion. The signed portion starts from the first name component and ends
     * just before the final name component (which is assumed to be a signature for
     * a signed interest).
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeInterest(interest: Interest): any;

    /**
     * Decode input as an interest and set the fields of the interest object.
     * Your derived class should override.
     * @param {Interest} interest The Interest object whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @return {object} An associative array with fields
     * (signedPortionBeginOffset, signedPortionEndOffset) where
     * signedPortionBeginOffset is the offset in the encoding of the beginning of
     * the signed portion, and signedPortionEndOffset is the offset in the encoding
     * of the end of the signed portion. The signed portion starts from the first
     * name component and ends just before the final name component (which is
     * assumed to be a signature for a signed interest).
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    decodeInterest(interest: Interest, input: Buffer, copy?: boolean): any

    /**
     * Encode data and return the encoding and signed offsets. Your derived class
     * should override.
     * @param {Data} data The Data object to encode.
     * @return {object} An associative array with fields
     * (encoding, signedPortionBeginOffset, signedPortionEndOffset) where encoding
     * is a Blob containing the encoding, signedPortionBeginOffset is the offset in
     * the encoding of the beginning of the signed portion, and
     * signedPortionEndOffset is the offset in the encoding of the end of the
     * signed portion.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeData(data: Data): any;

    /**
     * Decode input as a data packet, set the fields in the data object, and return
     * the signed offsets.  Your derived class should override.
     * @param {Data} data The Data object whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @return {object} An associative array with fields
     * (signedPortionBeginOffset, signedPortionEndOffset) where
     * signedPortionBeginOffset is the offset in the encoding of the beginning of
     * the signed portion, and signedPortionEndOffset is the offset in the encoding
     * of the end of the signed portion.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    decodeData(data: Data, input: Buffer, copy?: boolean): any;

    /**
     * Encode controlParameters and return the encoding.  Your derived class should
     * override.
     * @param {ControlParameters} controlParameters The ControlParameters object to
     * encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeControlParameters(controlParameters: ControlParameters): Blob;

    /**
     * Decode input as a controlParameters and set the fields of the
     * controlParameters object. Your derived class should override.
     * @param {ControlParameters} controlParameters The ControlParameters object
     * whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    decodeControlParameters(controlParameters: ControlParameters, input: Buffer, copy?: boolean): void;

    /**
     * Encode controlResponse and return the encoding.  Your derived class should
     * override.
     * @param {ControlResponse} controlResponse The ControlResponse object to
     * encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeControlResponse(controlResponse: ControlResponse): Blob;

    /**
     * Decode input as a controlResponse and set the fields of the
     * controlResponse object. Your derived class should override.
     * @param {ControlResponse} controlResponse The ControlResponse object
     * whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    decodeControlResponse(controlResponse: ControlResponse, input: Buffer, copy?: boolean): void;

    /**
     * Encode signature as a SignatureInfo and return the encoding. Your derived
     * class should override.
     * @param {Signature} signature An object of a subclass of Signature to encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeSignatureInfo(signature: Signature): Blob;

    /**
     * Decode signatureInfo as a signature info and signatureValue as the related
     * SignatureValue, and return a new object which is a subclass of Signature.
     * Your derived class should override.
     * @param {Buffer} signatureInfo The buffer with the signature info bytes to
     * decode.
     * @param {Buffer} signatureValue The buffer with the signature value to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @return {Signature} A new object which is a subclass of Signature.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    decodeSignatureInfoAndValue(signatureInfo: Buffer, signatureValue: Buffer, copy?: boolean): Signature;

    /**
     * Encode the signatureValue in the Signature object as a SignatureValue (the
     * signature bits) and return the encoding. Your derived class should override.
     * @param {Signature} signature An object of a subclass of Signature with the
     * signature value to encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class should override.
     */
    encodeSignatureValue(signature: Signature): Blob;

    /**
     * Decode input as an NDN-TLV LpPacket and set the fields of the lpPacket object.
     * Your derived class should override.
     * @param {LpPacket} lpPacket The LpPacket object whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    decodeLpPacket(lpPacket: LpPacket, input: Buffer, copy?: boolean): void;

    /**
     * Encode the DelegationSet and return the encoding.  Your derived class
     * should override.
     * @param {DelegationSet} delegationSet The DelegationSet object to
     * encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    encodeDelegationSet(delegationSet: DelegationSet): Blob;

    /**
     * Decode input as an DelegationSet and set the fields of the
     * delegationSet object. Your derived class should override.
     * @param {DelegationSet} delegationSet The DelegationSet object
     * whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    decodeDelegationSet(delegationSet: DelegationSet, input: Buffer, copy?: boolean): void;

    /**
     * Encode the EncryptedContent v1 and return the encoding.  Your derived class
     * should override.
     * @param {EncryptedContent} encryptedContent The EncryptedContent object to
     * encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    encodeEncryptedContent(encryptedContent: EncryptedContent): Blob;

    /**
     * Decode input as an EncryptedContent v1 and set the fields of the
     * encryptedContent object. Your derived class should override.
     * @param {EncryptedContent} encryptedContent The EncryptedContent object
     * whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    decodeEncryptedContent(encryptedContent: EncryptedContent, input: Buffer, copy?: boolean): void;

    /**
     * Encode the EncryptedContent v2 (used in Name-based Access Control v2) and
     * return the encoding.
     * See https://github.com/named-data/name-based-access-control/blob/new/docs/spec.rst .
     * Your derived class should override.
     * @param {EncryptedContent} encryptedContent The EncryptedContent object to
     * encode.
     * @return {Blob} A Blob containing the encoding.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    encodeEncryptedContentV2(encryptedContent: EncryptedContent): Blob;

    /**
     * Decode input as an EncryptedContent v2 (used in Name-based Access Control v2)
     * and set the fields of the encryptedContent object.
     * See https://github.com/named-data/name-based-access-control/blob/new/docs/spec.rst .
     * Your derived class should override.
     * @param {EncryptedContent} encryptedContent The EncryptedContent object
     * whose fields are updated.
     * @param {Buffer} input The buffer with the bytes to decode.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @throws Error This always throws an "unimplemented" error. The derived class
     * should override.
     */
    decodeEncryptedContentV2(encryptedContent: EncryptedContent, input: Buffer, copy?: boolean): void;

    /**
     * Set the static default WireFormat used by default encoding and decoding
     * methods.
     * @param {WireFormat} wireFormat An object of a subclass of WireFormat.
     */
    static setDefaultWireFormat(wireFormat: WireFormat): void;

    /**
     * Return the default WireFormat used by default encoding and decoding methods
     * which was set with setDefaultWireFormat.
     * @return {WireFormat} An object of a subclass of WireFormat.
     */
    static getDefaultWireFormat(): WireFormat;
}