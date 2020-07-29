export class OID {
    constructor(oid: string | OID);

    getIntegerList(): number[];

    setIntegerList(oid: number[]): void;

    toString(): string;

    equals(other: OID): boolean;
}