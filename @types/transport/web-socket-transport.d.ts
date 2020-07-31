import {Face} from "../face";
// @ts-ignore
export class WebSocketTransport extends Transport {
    constructor();

    /**
     * Connect to the micro forwarder according to the info in connectionInfo.
     * Listen on the connection to read an entire packet element and call
     * elementListener.onReceivedElement(element). However, if the received object
     * type field is not "Buffer" then just call this.onReceivedObject(obj).
     * @param {WebSocketTransport.ConnectionInfo} connectionInfo
     * @param {object} elementListener The elementListener with function
     * onReceivedElement which must remain valid during the life of this object.
     * @param {function} onopenCallback Once connected, call onopenCallback().
     * @param {function} onclosedCallback (optional) If the connection is closed by
     * the remote host, call onclosedCallback(). If omitted or null, don't call it.
     */
    connect(connectionInfo: WebSocketTransport.ConnectionInfo,
            elementListener: Object, onopenCallback: () => any, onclosedCallback: () => any);

    /**
     * @deprecated This is deprecated. You should not call Transport.connect
     * directly, since it is called by Face methods.
     */
    connectByFace(face: Face, onopenCallback: () => any): any;

    send(data: Buffer): any;

    close(): any;
}

export namespace WebSocketTransport {
    /**
     * Create a new WebSocketTransport.ConnectionInfo which extends
     * Transport.ConnectionInfo to hold the host and port info for the WebSocket
     * connection.
     * @param {string} host The host for the connection. However, if the host string
     * begins with "ws:" or "wss:", then ignore port and use the string as the full
     * endpoint URI.
     * @param {number} port (optional) The port number for the connection. If
     * omitted, use 9696.
     */
    class ConnectionInfo {
        constructor(host: string, port?: number);

        /**
         * Check if the fields of this WebSocketTransport.ConnectionInfo equal the other
         * RuntimePortTransport.ConnectionInfo.
         * @param {WebSocketTransport.ConnectionInfo} The other object to check.
         * @return {boolean} True if the objects have equal fields, false if not.
         */
        equals(other: ConnectionInfo): boolean;

        toString(): string;

        hostIsUri(): boolean;
    }
}