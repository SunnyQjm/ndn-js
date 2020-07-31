import { Blob } from "./util";
import { Data } from "./data";
import { Name } from "./name";
import {Signature} from "./signature";
import {DelegationSet} from "./delegation-set";

export class Interest extends Signature{
    constructor(name?: Name|string);
    constructor(interest: Interest);

    getName(): Name;
    getCanBePrefix(): boolean;
    getMustBeFresh(): boolean;
    getForwardingHint(): DelegationSet;
    getNonce(): Blob;
    getInterestLifetimeMilliseconds(): number;
    getApplicationParameters(): Blob;
    getIncomingFaceId(): number;

    setName(name: Name): Interest;
    setCanBePrefix(canBePrefix: boolean): Interest;
    setMustBeFresh(mustBeFresh: boolean): Interest;
    setForwardingHint(fh: DelegationSet): Interest;
    setInterestLifetimeMilliseconds(lifetime: number): Interest;
    setApplicationParameters(parameters: Blob|Buffer): Interest;

    appendParametersDigestToName(): Interest;
    matchesData(data: Data): boolean;
    matchesName(name: Name): boolean;
    refreshNonce(): void;
    toUri(): string;
    wireDecode(input: Blob|Buffer): void;
    wireEncode(): Blob;
}

