export class OID {
    getIntegerList(): number[];

    setIntegerList(oid: number[]): void;

    toString(): string;

    equals(other: OID): boolean;
}