import {CertificateFetcher} from "./certificate-fetcher";
import {Face} from "../../face";

export class CertificateFetcherFromNetwork extends CertificateFetcher {
    /**
     * CertificateFetcherFromNetwork extends CertificateFetcher to fetch missing
     * certificates from the network.
     *
     * Create a CertificateFetcherFromNetwork to fetch certificates using the Face.
     * @param {Face} face The face for calling expressInterest.
     * @constructor
     */
    constructor(face: Face);
}