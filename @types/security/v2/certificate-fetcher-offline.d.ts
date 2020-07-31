import {CertificateFetcher} from "./certificate-fetcher";

export class CertificateFetcherOffline extends CertificateFetcher {
    /**
     * CertificateFetcherOffline extends CertificateFetcher to implement a fetcher
     * that does not fetch certificates (always offline).
     * @constructor
     */
    constructor();
}