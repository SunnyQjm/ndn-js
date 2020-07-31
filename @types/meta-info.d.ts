import {Name} from "./name";
import {ContentType} from "./data";

export class MetaInfo {
    constructor(meta?: MetaInfo);

    getType(): ContentType;

    getOtherTypeCode(): number;

    getFreshnessPeriod(): number;

    getFinalBlockId(): Name.Component;

    setType(type: ContentType): void;

    setOtherTypeCode(otherTypeCode: number): void;

    setFreshnessPeriod(freshness: number): void;

    setFinalBlockId(comp: Name.Component): void;
}