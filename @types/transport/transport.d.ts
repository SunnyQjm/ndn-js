export class Transport {

    /**
     * Transport is a base class for specific transport classes such as TcpTransport.
     * @constructor
     */
    constructor();

    /**
     * Determine whether this transport connecting according to connectionInfo is to
     * a node on the current machine. This affects the processing of
     * Face.registerPrefix(): if the NFD is local, registration occurs with the
     * '/localhost/nfd...' prefix; if non-local, the library will attempt to use
     * remote prefix registration using '/localhop/nfd...'
     * @param {Transport.ConnectionInfo} connectionInfo A ConnectionInfo with the
     * host to check.
     * @param {function} onResult On success, this calls onResult(isLocal) where
     * isLocal is true if the host is local, false if not. We use callbacks because
     * this may need to do an asynchronous DNS lookup.
     * @param {function} onError On failure for DNS lookup or other error, this
     * calls onError(message) where message is an error string.
     */
    isLocal(connectionInfo: Transport.ConnectionInfo, onResult: (isLocal: boolean) => any, onError: (err: any) => any): any;
}

export namespace Transport {
    class ConnectionInfo {
        constructor();
    }
}