export class DigestTree {
    /**
     * @constructor
     */
    constructor();

    /**
     * Update the digest tree and recompute the root digest. If the combination of dataPrefix
     * and sessionNo already exists in the tree then update its sequenceNo (only if the given
     * sequenceNo is newer), otherwise add a new node.
     * @param {string} The name prefix.
     * @param {int} sessionNo The session number.
     * @param {int} sequenceNo The sequence number.
     * @return True if the digest tree is updated, false if not
     */
    update(dataPrefix: string, sessionNo: number, sequenceNo: number);

    sortNodes(node1: DigestTree.Node, node2: DigestTree.Node): any;

    find(dataPrefix: string, sessionNo: number): any;

    size(): number;

    get(i: number): any;

    getRoot(): any;

    recomputeRoot(): any;
}

export namespace DigestTree {
    class Node {
        // The meaning of a session is explained here:
// http://named-data.net/doc/ndn-ccl-api/chrono-sync2013.html
// DigestTree.Node works with seqno_seq and seqno_session, without protobuf definition,
        constructor(dataPrefix: string, seqno_session: any, seqno_seq: number);

        getDataPrefix(): string;

        getSessionNo(): number;

        getSequenceNo(): number;

        getDigest(): string;

        setSequenceNo(sequenceNo: number): any;

        Int32ToBuffer(value): Buffer;

        recomputeDigest(): any;

        static Compare(node1: Node, node2: Node): any;
    }
}