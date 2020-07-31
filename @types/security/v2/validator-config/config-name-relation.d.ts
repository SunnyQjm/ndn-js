import {Name} from "../../../name";

export class ConfigNameRelation {
    /**
     * ConfigNameRelation defines the ConfigNameRelation.Relation enum and static
     * methods to work with name relations for the ValidatorConfig.
     * @constructor
     */
    constructor();

    /**
     * Get a string representation of the Relation enum.
     * @param {number} relation The value for the ConfigNameRelation.Relation enum.
     * @return {String} The string representation.
     */
    static toString(relation: number): string;

    /**
     * Check whether name1 and name2 satisfy the relation.
     * @param {number} relation The value for the ConfigNameRelation.Relation enum.
     * @param {Name} name1 The first name to check.
     * @param {Name} name2 The second name to check.
     * @return {boolean} True if the names satisfy the relation.
     */
    static checkNameRelation(relation: number, name1: Name, name2: Name): boolean;

    /**
     * Convert relationString to a Relation enum.
     * @param {String} relationString the string to convert.
     * @return {number} The value for the ConfigNameRelation.Relation enum.
     * @throws ValidatorConfigError if relationString cannot be converted.
     */
    static getNameRelationFromString(relationString: string): number;
}

export namespace ConfigNameRelation {
    class Relation {
        static EQUAL: number;
        static IS_PREFIX_OF: number;
        static IS_STRICT_PREFIX_OF: number;
    }
}