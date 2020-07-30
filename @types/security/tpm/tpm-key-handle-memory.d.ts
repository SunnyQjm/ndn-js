import {TpmPrivateKey} from "./tpm-private-key";

export class TpmKeyHandleMemory {
    /**
     * TpmKeyHandleMemory extends TpmKeyHandle to implement a TPM key handle that
     * keeps the private key in memory.
     *
     * Create a TpmKeyHandleMemory to use the given in-memory key.
     * @param {TpmPrivateKey} key The in-memory key.
     * @constructor
     */
    constructor(key: TpmPrivateKey);


}