export class UnixTransport {
    /**
     * A UnixTransport connects to the forwarder using a Unix socket for Node.js.
     * @constructor
     */
    constructor();

    /**
     * Connect to the micro forwarder according to the info in connectionInfo.
     * Listen on the connection to read an entire packet element and call
     * elementListener.onReceivedElement(element). However, if the received object
     * type field is not "Buffer" then just call this.onReceivedObject(obj).
     * @param {UnixTransport.ConnectionInfo} connectionInfo
     * @param {object} elementListener The elementListener with function
     * onReceivedElement which must remain valid during the life of this object.
     * @param {function} onopenCallback Once connected, call onopenCallback().
     * @param {function} onclosedCallback (optional) If the connection is closed by
     * the remote host, call onclosedCallback(). If omitted or null, don't call it.
     */
    connect(connectionInfo: UnixTransport.ConnectionInfo,
            elementListener: Object, onopenCallback: () => any, onclosedCallback: () => any);


    send(data: Buffer): any;

    close(): any;
}

export namespace UnixTransport {
    class ConnectionInfo {
        /**
         * Create a new UnixTransport.ConnectionInfo which extends
         * Transport.ConnectionInfo to hold the socket file path for the Unix
         * socket connection.
         * @param {string} filePath The file path of the Unix socket file.
         */
        constructor(filePath: string);

        /**
         * Check if the fields of this UnixTransport.ConnectionInfo equal the other
         * RuntimePortTransport.ConnectionInfo.
         * @param {UnixTransport.ConnectionInfo} The other object to check.
         * @return {boolean} True if the objects have equal fields, false if not.
         */
        equals(other: ConnectionInfo): boolean;

        toString(): string;
    }
}