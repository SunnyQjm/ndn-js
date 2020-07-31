import {Blob} from "./util";
import {Data} from "./data";
import {Interest} from "./interest";
import {KeyChain} from "./security";
import {Name} from "./name";
import {NetworkNack} from "./network-nack";
import {Transport, TransportConnectionInfo} from "./transport";
import {InterestFilter} from "./interest-filter";

export interface FaceCtorOptions {
    getTransport?: () => Transport;
    getConnectionInfo?: () => TransportConnectionInfo;
    connectionInfo?: TransportConnectionInfo | null;
    host?: string | null;
    port?: number | null;
}

export type OnInterestCallback = (prefix: Name, interest: Interest, face: Face, filterId: number, filter: InterestFilter) => any;

export type OnDataCallback = (interest: Interest, data: Data) => any;
export type OnTimeoutCallback = (interest: Interest) => any;
export type OnNetworkNackCallback = (interest: Interest, nack: NetworkNack) => any;

export class Face {
    constructor(transport: Transport, connectionInfo: TransportConnectionInfo);
    constructor(settings?: FaceCtorOptions);

    expressInterest(interest: Interest | Name,
                    onData: OnDataCallback,
                    onTimeout?: OnTimeoutCallback,
                    onNetworkNack?: OnNetworkNackCallback): number;
    expressInterest(name: Name,
                    interestTemplate: Interest,
                    onData: OnDataCallback,
                    onTimeout?: OnTimeoutCallback,
                    onNetworkNack?: OnNetworkNackCallback): number;

    static getMaxNdnPacketSize(): number;

    putData(data: Data): void;

    registerPrefix(prefix: Name,
                   onInterest: OnInterestCallback,
                   onRegisterFailed: (prefix: Name) => any,
                   onRegisterSuccess?: (prefix: Name, registeredPrefixId: number) => any,
                   flags?: ForwardingFlags): number;

    close(): void;

    removePendingInterest(id: number): void;

    removeRegisteredPrefix(id: number): void;

    send(encoding: Blob | Buffer): void;

    setCommandCertificateName(certificateName: Name): void;

    setCommandSigningInfo(keyChain: KeyChain, certificateName: Name): void;

    setInterestFilter(filter: InterestFilter | Name, onInterest: OnInterestCallback): number;

    unsetInterestFilter(id: number): void;
}

// no declaration because this type is rarely used
export class ForwardingFlags {
}
