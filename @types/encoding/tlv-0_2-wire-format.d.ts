import {WireFormat} from "./wire-format";
import {Name} from "../name";
import {TlvDecoder, TlvEncoder} from "./tlv";
import {Interest} from "../interest";
import {KeyLocator, KeyLocatorType} from "../key-locator";
import {Data} from "../data";
import {MetaInfo} from "../meta-info";
import {ControlParameters} from "../control-parameters";

export class Tlv0_2WireFormat extends WireFormat{
    /**
     * Get a singleton instance of a Tlv0_2WireFormat.  To always use the
     * preferred version NDN-TLV, you should use TlvWireFormat.get().
     * @return {Tlv0_2WireFormat} The singleton instance.
     */
    static get(): Tlv0_2WireFormat;

    /**
     * Encode the name component to the encoder as NDN-TLV. This handles different
     * component types such as ImplicitSha256DigestComponent.
     * @param {Name.Component} component The name component to encode.
     * @param {TlvEncoder} encoder The encoder to receive the encoding.
     */
    static encodeNameComponent(component: Name.Component, encoder: TlvEncoder);

    /**
     * Decode the name component as NDN-TLV and return the component. This handles
     * different component types such as ImplicitSha256DigestComponent.
     * @param {TlvDecoder} decoder The decoder with the input.
     * @param {boolean} copy (optional) If true, copy from the input when making new
     * Blob values. If false, then Blob values share memory with the input, which
     * must remain unchanged while the Blob values are used. If omitted, use true.
     * @return {Name.Component} A new Name.Component.
     */
    static decodeNameComponent(decoder: TlvDecoder, copy?: boolean): Name.Component;

    /**
     * Encode the name to the encoder.
     * @param {Name} name The name to encode.
     * @param {TlvEncoder} encoder The encoder to receive the encoding.
     * @return {object} An associative array with fields
     * (signedPortionBeginOffset, signedPortionEndOffset) where
     * signedPortionBeginOffset is the offset in the encoding of the beginning of
     * the signed portion, and signedPortionEndOffset is the offset in the encoding
     * of the end of the signed portion. The signed portion starts from the first
     * name component and ends just before the final name component (which is
     * assumed to be a signature for a signed interest).
     */
    static encodeName(name: Name, encoder: TlvEncoder): any;

    /**
     * Clear the name, decode a Name from the decoder and set the fields of the name
     * object.
     * @param {Name} name The name object whose fields are updated.
     * @param {TlvDecoder} decoder The decoder with the input.
     * @param copy
     * @return {object} An associative array with fields
     * (signedPortionBeginOffset, signedPortionEndOffset) where
     * signedPortionBeginOffset is the offset in the encoding of the beginning of
     * the signed portion, and signedPortionEndOffset is the offset in the encoding
     * of the end of the signed portion. The signed portion starts from the first
     * name component and ends just before the final name component (which is
     * assumed to be a signature for a signed interest).
     */
    static decodeName(name: Name, decoder: TlvDecoder, copy?: boolean): any;

    /**
     * Encode the interest selectors.  If no selectors are written, do not output a
     * Selectors TLV.
     */
    static encodeSelectors(interest: Interest, encoder: TlvEncoder): void;

    static decodeSelectors(interest: Interest, decoder: TlvDecoder, copy?: boolean): void;

    static encodeExclude(exclude: Name.Component[], encoder: TlvEncoder): void;

    static decodeExclude(exclude: Name.Component, decoder: TlvDecoder, copy?: boolean): void;

    static encodeKeyLocator(type: KeyLocatorType, keyLocator: KeyLocator, encoder: TlvEncoder): void;

    static decodeKeyLocator(expectedType: KeyLocatorType, keyLocator: KeyLocator, decoder: TlvDecoder, copy?: boolean): void;

    static decodeSignatureInfo(data: Data, decoder: TlvDecoder, copy?: boolean): void;

    static encodeMetaInfo(metaInfo: MetaInfo, encoder: TlvEncoder): void;

    static decodeMetaInfo(metaInfo: MetaInfo, decoder: TlvDecoder, copy?: boolean): void;

    static encodeControlParameters(controlParameters: ControlParameters, encoder: TlvEncoder): void;

    static decodeControlParameters(controlParameters: ControlParameters, decoder: TlvDecoder, copy?: boolean): void;


}