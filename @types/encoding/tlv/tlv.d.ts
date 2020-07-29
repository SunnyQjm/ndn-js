export class Tlv {
    static Interest: number;
    static Data: number;
    static Name: number;
    static ImplicitSha256DigestComponent: number;
    static ParametersSha256DigestComponent: number;
    static NameComponent: number;
    static Selectors: number;
    static Nonce: number;
// <Unassigned>;
    static InterestLifetime: number;
    static MinSuffixComponents: number;
    static MaxSuffixComponents: number;
    static PublisherPublicKeyLocator: number;
    static Exclude: number;
    static ChildSelector: number;
    static MustBeFresh: number;
    static Any: number;
    static MetaInfo: number;
    static Content: number;
    static SignatureInfo: number;
    static SignatureValue: number;
    static ContentType: number;
    static FreshnessPeriod: number;
    static FinalBlockId: number;
    static SignatureType: number;
    static KeyLocator: number;
    static KeyLocatorDigest: number;
    static ForwardingHint: number;
    static SelectedDelegation: number;
    static CanBePrefix: number;
    static HopLimit: number;
    static ApplicationParameters: number;

    static SignatureType_DigestSha256: number;
    static SignatureType_SignatureSha256WithRsa: number;
    static SignatureType_SignatureSha256WithEcdsa: number;
    static SignatureType_SignatureHmacWithSha256: number;

    static ContentType_Default: number;
    static ContentType_Link: number;
    static ContentType_Key: number;

    static NfdCommand_ControlResponse: number;
    static NfdCommand_StatusCode: number;
    static NfdCommand_StatusText: number;

    static ControlParameters_ControlParameters: number;
    static ControlParameters_FaceId: number;
    static ControlParameters_Uri: number;
    static ControlParameters_LocalUri: number;
    static ControlParameters_LocalControlFeature: number;
    static ControlParameters_Origin: number;
    static ControlParameters_Cost: number;
    static ControlParameters_Capacity: number;
    static ControlParameters_Count: number;
    static ControlParameters_BaseCongestionMarkingInterval: number;
    static ControlParameters_DefaultCongestionThreshold: number;
    static ControlParameters_Mtu: number;
    static ControlParameters_Flags: number;
    static ControlParameters_Mask: number;
    static ControlParameters_Strategy: number;
    static ControlParameters_ExpirationPeriod: number;

    static LpPacket_LpPacket: number;
    static LpPacket_Fragment: number;
    static LpPacket_Sequence: number;
    static LpPacket_FragIndex: number;
    static LpPacket_FragCount: number;
    static LpPacket_Nack: number;
    static LpPacket_NackReason: number;
    static LpPacket_NextHopFaceId: number;
    static LpPacket_IncomingFaceId: number;
    static LpPacket_CachePolicy: number;
    static LpPacket_CachePolicyType: number;
    static LpPacket_CongestionMark: number;
    static LpPacket_IGNORE_MIN: number;
    static LpPacket_IGNORE_MAX: number;

    static Link_Preference: number;
    static Link_Delegation: number;

    static Encrypt_EncryptedContent: number;
    static Encrypt_EncryptionAlgorithm: number;
    static Encrypt_EncryptedPayload: number;
    static Encrypt_InitialVector: number;
    static Encrypt_EncryptedPayloadKey: number;

    static SafeBag_SafeBag: number;
    static SafeBag_EncryptedKeyBag: number;

// For RepetitiveInterval.
    static Encrypt_StartDate: number;
    static Encrypt_EndDate: number;
    static Encrypt_IntervalStartHour: number;
    static Encrypt_IntervalEndHour: number;
    static Encrypt_NRepeats: number;
    static Encrypt_RepeatUnit: number;
    static Encrypt_RepetitiveInterval: number;

// For Schedule.
    static Encrypt_WhiteIntervalList: number;
    static Encrypt_BlackIntervalList: number;
    static Encrypt_Schedule: number;

    static ValidityPeriod_ValidityPeriod: number;
    static ValidityPeriod_NotBefore: number;
    static ValidityPeriod_NotAfter: number;

    /**
     * Strip off the lower 32 bits of x and divide by 2^32, returning the "high
     * bytes" above 32 bits.  This is necessary because JavaScript << and >> are
     * restricted to 32 bits.
     * (This could be a general function, but we define it here so that the
     * Tlv encoder/decoder is self-contained.)
     * @param {number} x
     * @return {number}
     */
    static getHighBytes(x: number): number;
}
