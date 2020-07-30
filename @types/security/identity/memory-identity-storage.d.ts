import {IdentityStorage} from "./identity-storage";

export class MemoryIdentityStorage extends IdentityStorage {
    /**
     * MemoryIdentityStorage extends IdentityStorage and implements its methods to
     * store identity, public key and certificate objects in memory. The application
     * must get the objects through its own means and add the objects to the
     * MemoryIdentityStorage object. To use permanent file-based storage, see
     * BasicIdentityStorage.
     * @constructor
     */
    constructor();
}