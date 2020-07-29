import {Name} from "./name";

export class InterestFilter {
    constructor(filter: InterestFilter);
    constructor(prefix: Name|string, regexFilter?: string);

    doesMatch(name: Name): boolean;
    getPrefix(): Name;
    getRegexFilter(): string;
    hasRegexFilter(): boolean;
}