import {Face} from "../face";
import {Transport} from "./transport";

// @ts-ignore
export class TcpTransport extends Transport {
    /**
     * Create a new TcpTransport.ConnectionInfo which extends
     * Transport.ConnectionInfo to hold the host and port info for the TCP
     * connection.
     * @param {string} host The host for the connection.
     * @param {number} port (optional) The port number for the connection. If
     * omitted, use 6363.
     */
    constructor(host: string, port?: number);

    /**
     * Connect to the micro forwarder according to the info in connectionInfo.
     * Listen on the connection to read an entire packet element and call
     * elementListener.onReceivedElement(element). However, if the received object
     * type field is not "Buffer" then just call this.onReceivedObject(obj).
     * @param {TcpTransport.ConnectionInfo} connectionInfo
     * @param {object} elementListener The elementListener with function
     * onReceivedElement which must remain valid during the life of this object.
     * @param {function} onopenCallback Once connected, call onopenCallback().
     * @param {function} onclosedCallback (optional) If the connection is closed by
     * the remote host, call onclosedCallback(). If omitted or null, don't call it.
     */
    connect(connectionInfo: TcpTransport.ConnectionInfo,
            elementListener: Object, onopenCallback: () => any, onclosedCallback: () => any);

    /**
     * @deprecated This is deprecated. You should not call Transport.connect
     * directly, since it is called by Face methods.
     */
    connectByFace(face: Face, onopenCallback: () => any): any;

    send(data: Buffer): any;

    close(): any;
}

export namespace TcpTransport {
    class ConnectionInfo {
        /**
         * Create a new TcpTransport.ConnectionInfo which extends
         * Transport.ConnectionInfo to hold the host and port info for the TCP
         * connection.
         * @param {string} host The host for the connection.
         * @param {number} port (optional) The port number for the connection. If
         * omitted, use 6363.
         */
        constructor(host: string, port?: number);

        /**
         * Check if the fields of this TcpTransport.ConnectionInfo equal the other
         * RuntimePortTransport.ConnectionInfo.
         * @param {TcpTransport.ConnectionInfo} The other object to check.
         * @return {boolean} True if the objects have equal fields, false if not.
         */
        equals(other: ConnectionInfo): boolean;

        toString(): string;
    }
}