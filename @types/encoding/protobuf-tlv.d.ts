import {
    Name
} from "../name";
import {
    Blob
} from "../util";
import {
    TlvDecoder,
    TlvEncoder
} from "./tlv";

export class ProtobufTlv {
    static establishField(): void;

    /**
     * Encode the Protobuf message object as NDN-TLV. This calls
     * message.encodeAB() to ensure that all required fields are present and
     * raises an exception if not. (This does not use the result of toArrayBuffer().)
     * @param {ProtoBuf.Builder.Message} message The Protobuf message object.
     * @param {ProtoBuf.Reflect.T} descriptor The reflection descriptor for the
     * message. For example, if the message is of type "MyNamespace.MyMessage" then
     * the descriptor is builder.lookup("MyNamespace.MyMessage").
     * @return {Blob} The encoded buffer in a Blob object.
     */
    static encode(message: any, descriptor: any): Blob;

    /**
     * Decode the input as NDN-TLV and update the fields of the Protobuf message
     * object.
     * @param {ProtoBuf.Builder.Message} message The Protobuf message object. This
     * does not first clear the object.
     * @param {ProtoBuf.Reflect.T} descriptor The reflection descriptor for the
     * message. For example, if the message is of type "MyNamespace.MyMessage" then
     * the descriptor is builder.lookup("MyNamespace.MyMessage").
     * @param {Blob|Buffer} input The buffer with the bytes to decode.
     */
    static decode(message: any, descriptor: any, input: Blob | Buffer): void;

    /**
     * Return a Name made from the component array in a Protobuf message object,
     * assuming that it was defined with "repeated bytes". For example:
     * message Name {
     *   repeated bytes component = 8;
     * }
     * @param {Array} componentArray The array from the Protobuf message object
     * representing the "repeated bytes" component array.
     * @return A new Name.
     */
    static toName(componentArray: any[]): Name;
}