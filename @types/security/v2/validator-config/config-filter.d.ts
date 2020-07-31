import {Name} from "../../../name";
import {BoostInfoTree} from "../../../util/boost-info-parser";

export class ConfigFilter {
    /**
     * ConfigFilter is an abstract base class for RegexNameFilter, etc. used by
     * ValidatorConfig. The ValidatorConfig class consists of a set of rules.
     * The Filter class is a part of a rule and is used to match a packet.
     * Matched packets will be checked against the checkers defined in the rule.
     * @constructor
     */
    constructor();

    /**
     * Call the virtual matchName method based on the packet type.
     * @param {boolean} isForInterest True if packetName is for an Interest, false
     * if for a Data packet.
     * @param {Name} packetName The packet name. For a signed interest, the last two
     * components are skipped but not removed.
     * @return {boolean} True for a match.
     */
    match(isForInterest: boolean, packetName: Name): boolean;

    /**
     * Create a filter from the configuration section.
     * @param {BoostInfoTree} configSection The section containing the definition of
     * the filter, e.g. one of "validator.rule.filter".
     * @return {ConfigFilter} A new filter created from the configuration section.
     */
    static create(configSection: BoostInfoTree): ConfigFilter;

    /**
     * Implementation of the check for match.
     * @param {Name} packetName The packet name, which is already stripped of
     * signature components if this is a signed Interest name.
     * @return {boolean} True for a match.
     */
    matchName(packetName: Name): boolean;
}

export class ConfigRelationNameFilter extends ConfigFilter {
    /**
     * ConfigRelationNameFilter extends ConfigFilter to check that the name is in
     * the given relation to the packet name.
     * The configuration
     * "filter
     * {
     *   type name
     *   name /example
     *   relation is-prefix-of
     * }"
     * creates ConfigRelationNameFilter("/example",
     *   ConfigNameRelation.Relation.IS_PREFIX_OF) .
     *
     * Create a ConfigRelationNameFilter for the given values.
     * @param {Name} name The relation name, which is copied.
     * @param {number} relation The relation type as a
     * ConfigNameRelation.Relation enum.
     * @constructor
     */
    constructor(name: Name, relation: number);
}

export class ConfigRegexNameFilter extends ConfigFilter {
    /**
     * ConfigRegexNameFilter extends ConfigFilter to check that the packet name
     * matches the specified regular expression.
     * The configuration
     * {@code
     * "filter
 * {
     *   type name
 *   regex ^[^<KEY>]*<KEY><>*<ksk-.*>$
 * }"}
     * creates
     * {@code ConfigRegexNameFilter("^[^<KEY>]*<KEY><>*<ksk-.*>$") }.
     *
     * Create a ConfigRegexNameFilter from the regex string.
     * @param {String} regexString The regex string.
     * @constructor
     */
    constructor(regexString: string);
}