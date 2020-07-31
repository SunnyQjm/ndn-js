import {KeyChain} from "./key-chain";
import {Name} from "../name";
import {SigningInfo} from "./signing-info";
import {WireFormat} from "../encoding";
import {Interest} from "../interest";

export class CommandInterestSigner {
    /**
     * CommandInterestSigner is a helper class to create command interests. This
     * keeps track of a timestamp and generates command interests by adding name
     * components according to the NFD Signed Command Interests protocol.
     * See makeCommandInterest() for details.
     * https://redmine.named-data.net/projects/ndn-cxx/wiki/CommandInterest
     *
     * Create a CommandInterestSigner to use the keyChain to sign.
     * @param {KeyChain} keyChain The KeyChain used to sign.
     * @constructor
     */
    constructor(keyChain: KeyChain);

    static POS_SIGNATURE_VALUE: number;
    static POS_SIGNATURE_INFO: number;
    static POS_NONCE: number;
    static POS_TIMESTAMP: number;

    static MINIMUM_SIZE: number;

    /**
     * Append the timestamp and nonce name components to the supplied name, create
     * an Interest object and signs it with the KeyChain given to the constructor.
     * This ensures that the timestamp is greater than the timestamp used in the
     * previous call.
     * @param {Name} name The Name for the Interest, which is copied.
     * @param {SigningInfo} params (optional) The signing parameters. If omitted,
     * use a default SigningInfo().
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the SignatureInfo and to encode interest name for signing. If omitted, use
     * WireFormat getDefaultWireFormat().
     * @param {function} onComplete (optional) This calls onComplete(interest) with
     * the new command Interest object. (Some crypto libraries only use a callback,
     * so onComplete is required to use these.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some database libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @return {Interest} If onComplete is omitted, return the new command Interest
     * object. Otherwise, if onComplete is supplied then return undefined and use
     * onComplete as described above.
     */
    makeCommandInterest(name: Name, params?: SigningInfo, wireFormat?: WireFormat,
                        onComplete?: (interest: Interest) => any, onError?: (err: any) => any);


}