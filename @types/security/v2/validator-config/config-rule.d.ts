import {ConfigFilter} from "./config-filter";
import {ConfigChecker} from "./config-checker";
import {Name} from "../../../name";
import {ValidationState} from "../validation-state";
import {BoostInfoTree} from "../../../util/boost-info-parser";

export class ConfigRule {
    /**
     * A ConfigRule represents a rule configuration section, used by ConfigValidator.
     *
     * Create a ConfigRule with empty filters and checkers.
     * @param {String} id The rule ID from the configuration section.
     * @param {boolean} isForInterest True if the rule is for an Interest packet,
     * false if it is for a Data packet.
     * @constructor
     */
    constructor(id: string, isForInterest: boolean);

    /**
     * Get the rule ID.
     * @return {String} The rule ID.
     */
    getId(): string;

    /**
     * Get the isForInterest flag.
     * @return {boolean} True if the rule is for an Interest packet, false if it is
     * for a Data packet.
     */
    getIsForInterest(): boolean;

    /**
     * Add the ConfigFilter to the list of filters.
     * @param {ConfigFilter} filter The ConfigFilter.
     */
    addFilter(filter: ConfigFilter);

    /**
     * Add the ConfigChecker to the list of checkers.
     * @param {ConfigChecker} checker The ConfigChecker.
     */
    addChecker(checker: ConfigChecker);

    /**
     * Check if the packet name matches the rule's filter.
     * If no filters were added, the rule matches everything.
     * @param {boolean} isForInterest True if packetName is for an Interest, false
     * if for a Data packet.
     * @param {Name} packetName The packet name. For a signed interest, the last two
     * components are skipped but not removed.
     * @return {boolean} True if at least one filter matches the packet name, false
     * if none of the filters match the packet name.
     * @throws ValidatorConfigError if the supplied isForInterest doesn't match the
     * one for which the rule is designed.
     */
    match(isForInterest: boolean, packetName: Name): boolean;

    /**
     * Check if the packet satisfies the rule's condition.
     * @param {boolean} isForInterest True if packetName is for an Interest, false
     * if for a Data packet.
     * @param {Name} packetName The packet name. For a signed interest, the last two
     * components are skipped but not removed.
     * @param {Name} keyLocatorName The KeyLocator's name.
     * @param {ValidationState} state This calls state.fail() if the packet is invalid.
     * @return {boolean} True if further signature verification is needed, or false
     * if the packet is immediately determined to be invalid in which case this
     * calls state.fail() with the proper code and message.
     * @throws ValidatorConfigError if the supplied isForInterest doesn't match the
     * one for which the rule is designed.
     */
    check(isForInterest: boolean, packetName: Name, keyLocatorName: Name, state: ValidationState): boolean;

    /**
     * Create a rule from configuration section.
     * @param {BoostInfoTree} configSection The section containing the definition of
     * the checker, e.g. one of "validator.rule".
     * @return {ConfigRule} A new ConfigRule created from the configuration
     */
    static create(configSection: BoostInfoTree): ConfigRule;
}