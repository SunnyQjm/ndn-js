/**
 * EncryptError holds the ErrorCode enum for errors from the encrypt library.
 */
export class EncryptError {

}

export namespace EncryptError {
    class ErrorCode {
        KekRetrievalFailure: 1
        KekRetrievalTimeout: 2
        KekInvalidName: 3

        KdkRetrievalFailure: 11
        KdkRetrievalTimeout: 12
        KdkInvalidName: 13
        KdkDecryptionFailure: 14

        CkRetrievalFailure: 21
        CkRetrievalTimeout: 22
        CkInvalidName: 23

        MissingRequiredKeyLocator: 101
        TpmKeyNotFound: 102
        EncryptionFailure: 103
        DecryptionFailure: 104
        MissingRequiredInitialVector: 110

        General: 200

        // @deprecated These codes are from the NAC library v1.
        Timeout: 1001
        Validation: 1002
        UnsupportedEncryptionScheme: 1032
        InvalidEncryptedFormat: 1033
        NoDecryptKey: 1034
        DataRetrievalFailure: 1036
    }
}