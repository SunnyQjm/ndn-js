export class KeyIdType {
    // USER_SPECIFIED: A user-specified key ID. It is the user's responsibility
// to ensure the uniqueness of key names.
    static USER_SPECIFIED: number;

// SHA256: The SHA256 hash of the public key as the key id. This KeyId type
// guarantees the uniqueness of key names.
    static SHA256: number;

// RANDOM: A 64-bit random number as the key id. This KeyId provides rough
// uniqueness of key names.
    static RANDOM: number;
}