import {Blob} from "../util";
import SyncState = ChronoSync2013.SyncState;
import {Name} from "../name";
import {Face} from "../face";
import {KeyChain} from "../security";
import {Interest} from "../interest";
import {InterestFilter} from "../interest-filter";
import {Data} from "../data";

export class ChronoSync2013 {
    /**
     * ChronoSync2013 implements the NDN ChronoSync protocol as described in the
     * 2013 paper "Let's ChronoSync: Decentralized Dataset State Synchronization in
     * Named Data Networking". http://named-data.net/publications/chronosync .
     * @note The support for ChronoSync is experimental and the API is not finalized.
     * See the API docs for more detail at
     * http://named-data.net/doc/ndn-ccl-api/chrono-sync2013.html .
     *
     * Create a new ChronoSync2013 to communicate using the given face. Initialize
     * the digest log with a digest of "00" and and empty content. Register the
     * applicationBroadcastPrefix to receive interests for sync state messages and
     * express an interest for the initial root digest "00".
     * @param {function} onReceivedSyncState When ChronoSync receives a sync state message,
     * this calls onReceivedSyncState(syncStates, isRecovery) where syncStates is the
     * list of SyncState messages and isRecovery is true if this is the initial
     * list of SyncState messages or from a recovery interest. (For example, if
     * isRecovery is true, a chat application would not want to re-display all
     * the associated chat messages.) The callback should send interests to fetch
     * the application data for the sequence numbers in the sync state.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onInitialized This calls onInitialized() when the first sync data
     * is received (or the interest times out because there are no other
     * publishers yet).
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {Name} applicationDataPrefix The prefix used by this application instance
     * for application data. For example, "/my/local/prefix/ndnchat4/0K4wChff2v".
     * This is used when sending a sync message for a new sequence number.
     * In the sync message, this uses applicationDataPrefix.toUri().
     * @param {Name} applicationBroadcastPrefix The broadcast name prefix including the
     * application name. For example, "/ndn/broadcast/ChronoChat-0.3/ndnchat1".
     * This makes a copy of the name.
     * @param {int} sessionNo The session number used with the applicationDataPrefix in
     * sync state messages.
     * @param {Face} face The Face for calling registerPrefix and expressInterest. The
     * Face object must remain valid for the life of this ChronoSync2013 object.
     * @param {KeyChain} keyChain To sign a data packet containing a sync state message, this
     * calls keyChain.sign(data, certificateName).
     * @param {Name} certificateName The certificate name of the key to use for signing a
     * data packet containing a sync state message.
     * @param {Milliseconds} syncLifetime The interest lifetime in milliseconds for sending
     * sync interests.
     * @param {function} onRegisterFailed If failed to register the prefix to receive
     * interests for the applicationBroadcastPrefix, this calls
     * onRegisterFailed(applicationBroadcastPrefix).
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @constructor
     */
    constructor(onReceivedSyncState: (syncStates: SyncState[], isRecovery: boolean) => any,
                onInitialized: () => any, applicationDataPrefix: Name,
                applicationBroadcastPrefix: Name, sessionNo: number, face: Face, keyChain: KeyChain,
                certificateName: Name, syncLifetime: number, onRegisterFailed: (applicationBroadcastPrefix: Name) => any);

    /**
     * Get a copy of the current list of producer data prefixes, and the
     * associated session number. You can use these in getProducerSequenceNo().
     * This includes the prefix for this user.
     * @return Array<ChronoSync2013.PrefixAndSessionNo> A copy of the list of each
     * producer prefix and session number.
     */
    getProducerPrefixes(): ChronoSync2013.PrefixAndSessionNo[];

    /**
     * Get the current sequence number in the digest tree for the given
     * producer dataPrefix and sessionNo.
     * @param {string} dataPrefix The producer data prefix as a Name URI string.
     * @param {number} sessionNo The producer session number.
     * @return {number} The current producer sequence number, or -1 if the producer
     * namePrefix and sessionNo are not in the digest tree.
     */
    getProducerSequenceNo(dataPrefix: string, sessionNo: number): number;

    /**
     * Increment the sequence number, create a sync message with the new sequence number,
     * and publish a data packet where the name is applicationBroadcastPrefix + root
     * digest of current digest tree. Then add the sync message to digest tree and digest
     * log which creates a new root digest. Finally, express an interest for the next sync
     * update with the name applicationBroadcastPrefix + the new root digest.
     * After this, application should publish the content for the new sequence number.
     * Get the new sequence number with getSequenceNo().
     * @param {Blob} applicationInfo (optional) This appends applicationInfo to the
     * content of the sync messages. This same info is provided to the receiving
     * application in the SyncState state object provided to the
     * onReceivedSyncState callback.
     */
    publishNextSequenceNo(applicationInfo: Blob): void;

    /**
     * Get the sequence number of the latest data published by this application instance.
     * @return {int} the sequence number
     */
    getSequenceNo(): number;


    /**
     * Unregister callbacks so that this does not respond to interests anymore.
     * If you will dispose this ChronoSync2013 object while your application is
     * still running, you should call shutdown() first.  After calling this, you
     * should not call publishNextSequenceNo() again since the behavior will be
     * undefined.
     */
    shutdown(): void;

    /**
     * Make a data packet with the syncMessage and with name applicationBroadcastPrefix + digest.
     * Sign and send.
     * @param {string} The root digest as a hex string for the data packet name.
     * @param {SyncStateMsg} The syncMessage updates the digest tree state with the given digest.
     */
    broadcastSyncState(digest: string, syncMessage: any);

    /**
     * Update the digest tree with the messages in content. If the digest tree root is not in
     * the digest log, also add a log entry with the content.
     * @param {SyncState[]} The sync state messages
     * @return {bool} True if added a digest log entry (because the updated digest tree root
     * was not in the log), false if didn't add a log entry.
     */
    // Whatever's received by ondata, is pushed into digest log as its data directly
    update(content: SyncState[]): boolean;

    logfind(digest: string): void;

    /**
     * Process the sync interest from the applicationBroadcastPrefix. If we can't
     * satisfy the interest, add it to the pending interest table in
     * this.contentCache so that a future call to contentCacheAdd may satisfy it.
     */
    onInterest(prefix: string, interest: Interest, face: Face, interestFilterId: number, filter: InterestFilter): void;

    /**
     * Process sync/recovery data.
     * @param {Interest}
     * @param {Data}
     */
    onData(interest: Interest, co: Data);

    initialTimeOut(interest: Interest): void;

    processRecoveryInst(interest: Interest, syncdigest: string, face: Face): void;

    /**
     * Common interest processing, using digest log to find the difference after syncdigest_t
     * @return True if sent a data packet to satisfy the interest.
     */
    processSyncInst(index: Interest, syncdigest_t: string, face: Face): boolean

    /**
     * Send recovery interset.
     * @param {string} syncdigest_t
     */
    sendRecovery(syncdigest_t: string): void;

    /**
     * This is called by onInterest after a timeout to check if a recovery is needed.
     * This method has an interest argument because we use it as the onTimeout for
     * Face.expressInterest.
     * @param interest
     * @param syncdigest_t
     * @param face
     */
    judgeRecovery(interest: Interest, syncdigest_t: string, face: Face);

    syncTimeout(interest): any;

    initialOndata(content: SyncState[]): any;

    dummyOnData(interest: Interest, data: Data): any;
}

export namespace ChronoSync2013 {
    class DigestLogEntry {
        constructor(digest: any, data: any);

        getDigest(): any;

        getData(): any;
    }

    class SyncState {
        /**
         * A SyncState holds the values of a sync state message which is passed to the
         * onReceivedSyncState callback which was given to the ChronoSyn2013
         * constructor. Note: this has the same info as the Protobuf class
         * Sync.SyncState, but we make a separate class so that we don't need the
         * Protobuf definition in the ChronoSync API.
         */
        constructor(dataPrefixUri: string, sessionNo: number, sequenceNo: number, applicationInfo: Blob);

        /**
         * Get the application data prefix for this sync state message.
         * @return The application data prefix as a Name URI string.
         */
        getDataPrefix(): string;

        /**
         * Get the session number associated with the application data prefix for
         * this sync state message.
         * @return The session number.
         */
        getSessionNo(): number;

        /**
         * Get the sequence number for this sync state message.
         * @return The sequence number.
         */
        getSequenceNo(): number;

        /**
         * Get the application info which was included when the sender published the
         * next sequence number.
         * @return {Blob} The applicationInfo Blob. If the sender did not provide any,
         * return an isNull Blob.
         */
        getApplicationInfo(): Blob;
    }

    class PrefixAndSessionNo {
        /**
         * A PrefixAndSessionNo holds a user's data prefix and session number (used to
         * return a list from getProducerPrefixes).
         */
        constructor(dataPrefixUri: string, sessionNo: number);

        getDataPrefix(): string;

        getSessionNo(): number;
    }
}