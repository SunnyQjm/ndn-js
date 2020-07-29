export class KeyType {
    static RSA: number;
    static EC: number;
    /**
     * @deprecated Use KeyType.EC .
     */
    static ECDSA: number;
    static AES: number;
}

export class KeyClass {
    static PUBLIC: number;
    static PRIVATE: number;
    static SYMMETRIC: number;
}

export class DigestAlgorithm {
    static SHA256: number;
}