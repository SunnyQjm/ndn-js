import {Name} from "../../../name";
import {ValidationState} from "../validation-state";
import {BoostInfoTree} from "../../../util/boost-info-parser";

export class ConfigChecker {
    /**
     * A ConfigChecker is an abstract base class for ConfigNameRelationChecker, etc.
     * used by ValidatorConfig to check if a packet name and KeyLocator satisfy the
     * conditions in a configuration section.
     * @constructor
     */
    constructor();

    /**
     * Check if the packet name ane KeyLocator name satisfy this checker's
     * conditions.
     * @param {boolean} isForInterest True if packetName is for an Interest, false
     * if for a Data packet.
     * @param {Name} packetName The packet name. For a signed interest, the last two
     * components are skipped but not removed.
     * @param {Name} keyLocatorName The KeyLocator's name.
     * @param {ValidationState} state This calls state.fail() if the packet is
     * invalid.
     * @return {boolean} True if further signature verification is needed, or false
     * if the packet is immediately determined to be invalid in which case this
     * calls state.fail() with the proper code and message.
     */
    check(isForInterest: boolean, packetName: Name, keyLocatorName: Name, state: ValidationState): boolean;

    /**
     * Create a checker from the configuration section.
     * @param {BoostInfoTree} configSection The section containing the definition of
     * the checker, e.g. one of "validation.rule.checker".
     * @return {ConfigChecker} A new checker created from the configuration section.
     */
    static create(configSection: BoostInfoTree): ConfigChecker;

    /**
     * Check if the packet name ane KeyLocator name satisfy this checker's
     * conditions.
     * @param {Name} packetName The packet name, which is already stripped of
     * signature components if this is a signed Interest name.
     * @param {Name} keyLocatorName The KeyLocator's name.
     * @param {ValidationState} state This calls state.fail() if the packet is
     * invalid.
     * @return {boolean} True if further signature verification is needed, or false
     * if the packet is immediately determined to be invalid in which case this
     * calls state.fail() with the proper code and message.
     */
    checkNames(packetName: Name, keyLocatorName: Name, state: ValidationState): boolean;
}

export class ConfigNameRelationChecker extends ConfigChecker {
    /**
     * ConfigNameRelationChecker extends ConfigChecker.
     * @param {Name} name
     * @param {number} relation The value for the ConfigNameRelation.Relation enum.
     * @constructor
     */
    constructor(name: Name, relation: number);
}

export class ConfigRegexChecker extends ConfigChecker {
    /**
     * ConfigRegexChecker extends ConfigChecker.
     * @param {String} regexString
     * @constructor
     */
    constructor(regexString: string);
}

export class ConfigHyperRelationChecker extends ConfigChecker {
    /**
     * ConfigHyperRelationChecker extends ConfigChecker.
     * @param {String} packetNameRegexString
     * @param {String} packetNameExpansion
     * @param {String} keyNameRegexString
     * @param {String} keyNameExpansion
     * @param {number} hyperRelation The value for the ConfigNameRelation.Relation enum.
     * @constructor
     */
    constructor(packetNameRegexString: string, packetNameExpansion: string, keyNameRegexString: string,
                keyNameExpansion: string, hyperRelation: number);
}