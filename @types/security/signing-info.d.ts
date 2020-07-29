import {Name} from "../name";
import {PibIdentity} from "./pib/pib-identity";
import {PibKey} from "./pib/pib-key";

export class SigningInfo {
    constructor(signerType: SigningInfo.SignerType, signerName: Name);
    constructor(arg?: SigningInfo | PibIdentity | PibKey | string);

    getSignerType(): SigningInfo.SignerType;

    getSignerName(): Name;
}

export namespace SigningInfo {
    enum SignerType {
        NULL = 0,
        ID = 1,
        KEY = 2,
        CERT = 3,
        SHA256 = 4,
    }
}