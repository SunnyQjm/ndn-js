import {ValidationPolicy} from "./validation-policy";
import {BoostInfoTree} from "../../util/boost-info-parser";

export class ValidationPolicyConfig extends ValidationPolicy {
    /**
     * ValidationPolicyConfig implements a validator which can be set up via a
     * configuration file. For command Interest validation, this policy must be
     * combined with ValidationPolicyCommandInterest in order to guard against
     * replay attacks.
     * @note This policy does not support inner policies (a sole policy or a
     * terminal inner policy).
     * See https://named-data.net/doc/ndn-cxx/current/tutorials/security-validator-config.html
     * @constructor
     */
    constructor();

    /**
     * There are three forms of load:
     * load(filePath) - Load the configuration from the given config file.
     * load(input, inputName) - Load the configuration from the given input string.
     * load(configSection, inputName) - Load the configuration from the given
     * configSection.
     * Each of these forms of load replaces any existing configuration.
     * @param {String} filePath The The path of the config file.
     * @param {String} input The contents of the configuration rules, with lines
     * separated by "\n" or "\r\n".
     * @param {BoostInfoTree} configSection The configuration section loaded from
     * the config file. It should have one "validator" section.
     * @param {String} inputName Used for log messages, etc.
     */
    load(filePathOrInputOrConfigSection: string | BoostInfoTree, inputName: string);


}