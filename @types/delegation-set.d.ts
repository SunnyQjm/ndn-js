import {Name} from "./name";

export class DelegationSet {
    size(): number;
    get(i: number): DelegationSet.Delegation;
    find(name: Name): number;

    add(preference: number, name: Name): void;
    remove(name: Name): boolean;
    clear(): void;
}

export namespace DelegationSet {
    class Delegation {
        getPreference(): number;
        getName(): Name;
    }
}