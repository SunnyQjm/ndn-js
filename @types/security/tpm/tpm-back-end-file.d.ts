import {TpmBackEnd} from "./tpm-back-end";

export class TpmBackEndFile extends TpmBackEnd {
    /**
     * TpmBackEndFile extends TpmBackEnd to implement a TPM back-end using on-disk
     * file storage. In this TPM, each private key is stored in a separate file with
     * permission 0400, i.e., owner read-only. The key is stored in PKCS #1 format
     * in base64 encoding.
     *
     * Create a TpmBackEndFile to use the given path to store files (of provided) or
     * to the default location.
     * @param {string} locationPath (optional) The full path of the directory to
     * store private keys. If omitted or null or "", use the default location
     * ~/.ndn/ndnsec-key-file.
     * @constructor
     */
    constructor(locationPath: string);
}

export namespace TpmBackEndFile {
    class TpmBackEndFileError {
        constructor(error: any);
    }

    type Error = TpmBackEndFileError;
}