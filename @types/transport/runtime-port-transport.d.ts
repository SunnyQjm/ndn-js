import {Transport} from "./transport";

// @ts-ignore
export class RuntimePortTransport extends Transport {
    /**
     * A RuntimePortTransport extends Transport to connect to a WebExtensions
     * runtime.port.
     * @param {function} onReceivedObject (optional) If supplied and the received
     * object type field is not "Buffer" then just call this.onReceivedObject(obj).
     * If this is null, then don't call it.
     * @constructor
     */
    constructor(onReceivedObject?: any);

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
     * @param {RuntimePortTransport.ConnectionInfo} connectionInfo
     * @param {object} elementListener The elementListener with function
     * onReceivedElement which must remain valid during the life of this object.
     * @param {function} onopenCallback Once connected, call onopenCallback().
     * @param {function} onclosedCallback (optional) If the connection is closed by
     * the remote host, call onclosedCallback(). If omitted or null, don't call it.
     */
    connect(connectionInfo: RuntimePortTransport.ConnectionInfo,
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

export namespace RuntimePortTransport {
    class ConnectionInfo{
        /**
         * Create a new RuntimePortTransport.ConnectionInfo which extends
         * Transport.ConnectionInfo to hold the runtime.port used to connect.
         * @param {runtime.port} port The runtime.port object.
         */
        constructor(port: any);

        /**
         * Check if the fields of this RuntimePortTransport.ConnectionInfo equal the other
         * RuntimePortTransport.ConnectionInfo.
         * @param {RuntimePortTransport.ConnectionInfo} The other object to check.
         * @return {boolean} True if the objects have equal fields, false if not.
         */
        equals(other: ConnectionInfo): boolean;

        toString(): string;
    }
}