import {PibImpl} from "./pib-impl";

export class PibMemory extends PibImpl {
    /**
     * PibMemory extends PibImpl and is used by the Pib class as an in-memory
     * implementation of a PIB. All the contents in the PIB are stored in memory and
     * have the same lifetime as the PibMemory instance.
     * @constructor
     */
    constructor();

    static getScheme(): string;
}