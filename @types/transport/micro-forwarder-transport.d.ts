import {Transport} from "./transport";

export class MicroForwarderTransport extends Transport {
    /**
     * A MicroForwarderTransport extends Transport to connect to the browser's
     * micro forwarder service. This assumes that the MicroForwarder extensions has
     * been installed.
     * @constructor
     */
    constructor();

    /**
     * Set the onReceivedObject callback, replacing any previous callback.
     * @param {function} onReceivedObject (optional) If supplied and the received
     * object type field is not "Buffer" then just call this.onReceivedObject(obj).
     * If this is null, then don't call it.
     */
    setOnReceivedObject(onReceivedObject?: (obj: Buffer) => any): void;

    /**
     * Connect to the micro forwarder according to the info in connectionInfo.
     * Listen on the connection to read an entire packet element and call
     * elementListener.onReceivedElement(element). However, if the received object
     * type field is not "Buffer" then just call this.onReceivedObject(obj).
     * @param {MicroForwarderTransport.ConnectionInfo} connectionInfo
     * @param {object} elementListener The elementListener with function
     * onReceivedElement which must remain valid during the life of this object.
     * @param {function} onopenCallback Once connected, call onopenCallback().
     * @param {function} onclosedCallback (optional) If the connection is closed by
     * the remote host, call onclosedCallback(). If omitted or null, don't call it.
     */
    connect(connectionInfo: MicroForwarderTransport.ConnectionInfo,
            elementListener: Object, onopenCallback: () => any, onclosedCallback: () => any);

    /**
     * Send the JavaScript over the connection created by connect.
     * @param {object} obj The object to send. It should have a field "type". If
     * "type" is "Buffer" then it is processed like an NDN packet.
     */
    sendObject(obj: any): void;

    /**
     * Send the buffer over the connection created by connect.
     * @param {Buffer} buffer The bytes to send.
     */
    send(buffer: Buffer): void;
}

export namespace MicroForwarderTransport {
    class ConnectionInfo {
        /**
         * Create a new MicroForwarderTransport.ConnectionInfo which extends
         * Transport.ConnectionInfo to hold info for the micro forwarer connection.
         */
        constructor();

        /**
         * Check if the fields of this MicroForwarderTransport.ConnectionInfo equal the other
         * MicroForwarderTransport.ConnectionInfo.
         * @param {MicroForwarderTransport.ConnectionInfo} The other object to check.
         * @return {boolean} True if the objects have equal fields, false if not.
         */
        equals(other: ConnectionInfo): boolean;

        toString(): string;
    }
}