import {Blob, SyncPromise} from "../util";
import {PublicKey} from "./certificate";
import {Data} from "../data";
import {CertificateV2} from "./v2";
import {WireFormat} from "../encoding";
import {Interest} from "../interest";

export class VerificationHelpers {
    /**
     * Verify the buffer against the signature using the public key.
     * @param {Buffer|Blob} buffer The input buffer to verify.
     * @param {Buffer|Blob} signature The signature bytes.
     * @param {PublicKey|Buffer|Blob} publicKey The object containing the public key,
     * or the public key DER which is used to make the PublicKey object.
     * @param {number} digestAlgorithm (optional) The digest algorithm as an int
     * from the DigestAlgorithm enum. If omitted, use DigestAlgorithm.SHA256.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if verification
     * succeeds, false if verification fails, or a promise rejected with Error for
     * an invalid public key type or digestAlgorithm.
     */
    static verifySignaturePromise(buffer: Buffer | Blob, signature: Buffer | Blob, publicKey: PublicKey | Buffer | Blob,
                                  digestAlgorithm?: number, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Verify the buffer against the signature using the public key.
     * @param {Buffer|Blob} buffer The input buffer to verify.
     * @param {Buffer|Blob} signature The signature bytes.
     * @param {PublicKey|Buffer|Blob} publicKey The object containing the public key,
     * or the public key DER which is used to make the PublicKey object.
     * @param {number} digestAlgorithm (optional) The digest algorithm as an int
     * from the DigestAlgorithm enum. If omitted, use DigestAlgorithm.SHA256.
     * @param {function} onComplete (optional) This calls
     * onComplete(result) with true if verification succeeds, false if verification
     * fails. If omitted, the return value is described below. (Some crypto
     * libraries only use a callback, so onComplete is required to use these.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an exception, then this calls onError(exception)
     * with the exception. If onComplete is defined but onError is undefined, then
     * this will log any thrown exception. (Some crypto libraries only use a
     * callback, so onError is required to be notified of an exception.)
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @return {boolean} If onComplete is omitted, return true if verification
     * succeeds, false if verification fails. Otherwise, if onComplete is supplied
     * then return undefined and use onComplete as described above.
     * @throws Error for an invalid public key type or digestAlgorithm. However, if
     * onComplete and onError are defined, then if there is an exception return
     * undefined and call onError(exception).
     */
    static verifySignature(buffer: Buffer | Blob, signature: Buffer | Blob, publicKey: PublicKey | Buffer | Blob,
                           digestAlgorithm?: number, onComplete?: (result: boolean) => any, onError?: (err: any) => any): boolean;

    /**
     * Verify the Data packet using the public key. This does not check the type of
     * public key or digest algorithm against the type of SignatureInfo in the Data
     * packet such as Sha256WithRsaSignature.
     * @param {Data} data The Data packet to verify.
     * @param {PublicKey|Buffer|Blob|CertificateV2} publicKeyOrCertificate The
     * object containing the public key, or the public key DER which is used to make
     * the PublicKey object, or the certificate containing the public key.
     * @param {number} digestAlgorithm (optional) The digest algorithm as an int
     * from the DigestAlgorithm enum. If omitted, use DigestAlgorithm.SHA256.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the Data packet. If omitted, use WireFormat getDefaultWireFormat().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if verification
     * succeeds, false if verification fails, or a promise rejected with Error for
     * an invalid public key type or digestAlgorithm.
     */
    static verifyDataSignaturePromise(data: Data, publicKeyOrCertificate: PublicKey | Buffer | Blob | CertificateV2,
                                      digestAlgorithm?: number, wireFormat?: WireFormat, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Verify the Interest packet using the public key, where the last two name
     * components are the SignatureInfo and signature bytes. This does not check the
     * type of public key or digest algorithm against the type of SignatureInfo such
     * as Sha256WithRsaSignature.
     * @param {Interest} interest The Interest packet to verify.
     * @param {PublicKey|Buffer|Blob|CertificateV2} publicKeyOrCertificate The
     * object containing the public key, or the public key DER which is used to make
     * the PublicKey object, or the certificate containing the public key.
     * @param {number} digestAlgorithm (optional) The digest algorithm as an int
     * from the DigestAlgorithm enum. If omitted, use DigestAlgorithm.SHA256.
     * @param {WireFormat} wireFormat (optional) A WireFormat object used to encode
     * the Interest packet. If omitted, use WireFormat getDefaultWireFormat().
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise which returns true if verification
     * succeeds, false if verification fails, or a promise rejected with Error for
     * an invalid public key type or digestAlgorithm.
     */
    static verifyInterestSignaturePromise(interest: Interest, publicKeyOrCertificate: PublicKey | Buffer | Blob | CertificateV2,
                                          digestAlgorithm?: number, wireFormat?: WireFormat, useSync?: boolean): Promise<boolean> | SyncPromise;

    /**
     * Verify the buffer against the digest using the digest algorithm.
     * @param {Buffer|Blob} buffer The input buffer to verify.
     * @param {Buffer|Blob} digest The digest bytes.
     * @param {number} digestAlgorithm The digest algorithm as an int from the
     * DigestAlgorithm enum, such as DigestAlgorithm.SHA256.
     * @return {boolean} true if verification succeeds, false if verification fails.
     * @throws Error for an invalid digestAlgorithm.
     */
    static verifyDigest(buffer: Buffer | Blob, digest: number, digestAlgorithm: number): boolean;
}