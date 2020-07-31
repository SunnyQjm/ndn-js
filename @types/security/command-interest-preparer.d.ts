import {Interest} from "../interest";
import {WireFormat} from "../encoding";

export class CommandInterestPreparer {
    /**
     * A CommandInterestPreparer keeps track of a timestamp and prepares a command
     * interest by adding a timestamp and nonce to the name of an Interest. This
     * class is primarily designed to be used by the CommandInterestSigner, but can
     * also be using in an application that defines custom signing methods not
     * supported by the KeyChain (such as HMAC-SHA1). See the Command Interest
     * documentation:
     * https://redmine.named-data.net/projects/ndn-cxx/wiki/CommandInterest
     *
     * Create a CommandInterestPreparer and initialize the timestamp to now.
     * @constructor
     */
    constructor();

    /**
     * Append a timestamp component and a random nonce component to interest's
     * name. This ensures that the timestamp is greater than the timestamp used in
     * the previous call.
     * @param {Interest} interest The interest whose name is append with components.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the SignatureInfo. If omitted, use WireFormat getDefaultWireFormat().
     */
    prepareCommandInterestName(interest: Interest, wireFormat?: WireFormat);


}