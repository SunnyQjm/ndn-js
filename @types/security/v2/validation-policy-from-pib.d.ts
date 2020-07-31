import {Pib} from "../pib";
import {ValidationPolicy} from "./validation-policy";

export class ValidationPolicyFromPib extends ValidationPolicy {
    /**
     * ValidationPolicyFromPib extends ValidationPolicy to implement a validator
     * policy that validates a packet using the default certificate of the key in
     * the PIB that is named by the packet's KeyLocator.
     *
     * Create a ValidationPolicyFromPib to use the given PIB.
     * @param {Pib} pib The PIB with certificates.
     * @constructor
     */
    constructor(pib: Pib);


}