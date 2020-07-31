import {Blob} from "./util";
import {Name} from "./name";
import {Signature} from "./signature";
import {MetaInfo} from "./meta-info";

export class Data extends Signature {
    constructor(name?: Name | string);
    constructor(data: Data);

    getName(): Name;

    getFullName(): Name;

    getMetaInfo(): MetaInfo;

    getContent(): Blob;

    getSignature(): Signature;

    getCongestionMark(): number;

    getIncomingFaceId(): number;

    setName(name: Name): Data;

    setMetaInfo(meta: MetaInfo): Data;

    setContent(content: Blob | Buffer): Data;

    setSignature(sig: Signature): Data;

    wireDecode(input: Blob | Buffer): void;

    wireEncode(): Blob;
}

export enum ContentType {
    BLOB = 0,
    LINK = 1,
    KEY = 2,
    NACK = 3,
    OTHER_CODE = 0x7fff,
}
