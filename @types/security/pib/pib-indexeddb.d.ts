import {PibImpl} from "./pib-impl";

export class PibIndexedDb extends PibImpl {
    /**
     * PibIndexedDb extends PibImpl and is used by the Pib class to store the
     * contents of the PIB using the browser's IndexedDB service.
     * @constructor
     */
    constructor();

    static getScheme(): string;

}