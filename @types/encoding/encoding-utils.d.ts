import {
    Interest
} from '../interest';
import {
    Data
} from "../data";
import {
    WireFormat
} from "./wire-format";

export class RSAKey {

}
export class EncodingUtils {

    static encodeToHexInterest(interest: Interest, wireFormat: WireFormat): string;

    static encodeToHexData(data: Data, wireFormat: WireFormat): string;

    static decodeHexInterest(input: string, wireFormat: WireFormat): Interest;

    static decodeHexData(input: string, wireFormat: WireFormat): Data;

    /**
     * Decode the Buffer array which holds SubjectPublicKeyInfo and return an RSAKey.
     */
    static decodeSubjectPublicKeyInfo(array: Buffer[]): RSAKey;

    /**
     * Return a user friendly HTML string with the contents of data.
     */
    static dataToHtml(data: Data): string;


}