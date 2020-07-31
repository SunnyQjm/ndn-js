import {ValidationPolicy} from "./validation-policy";
import {Name} from "../../name";

export class ValidationPolicyCommandInterest extends ValidationPolicy {
    /**
     * ValidationPolicyCommandInterest extends ValidationPolicy as a policy for
     * stop-and-wait command Interests. See:
     * https://redmine.named-data.net/projects/ndn-cxx/wiki/CommandInterest
     *
     * This policy checks the timestamp field of a stop-and-wait command Interest.
     * Signed Interest validation and Data validation requests are delegated to an
     * inner policy.
     *
     * Create a ValidationPolicyCommandInterest.
     * @param {ValidationPolicy} innerPolicy a ValidationPolicy for signed Interest
     * signature validation and Data validation. This must not be null.
     * @param {ValidationPolicyCommandInterest.Options} options (optional) The
     * stop-and-wait command Interest validation options. If omitted, use a default
     * Options().
     * @throws Error if innerPolicy is null.
     * @constructor
     */
    constructor(innerPolicy: ValidationPolicy, options: ValidationPolicyCommandInterest.Options);
}

export namespace ValidationPolicyCommandInterest {
    class Options {
        /**
         * Create a ValidationPolicyCommandInterest.Options with the values.
         * @param {number|ValidationPolicyCommandInterest.Options} gracePeriodOrOptions
         * (optional) The tolerance of the initial timestamp in milliseconds. (However,
         * if this is another ValidationPolicyCommandInterest.Options, then copy values
         * from it.) If omitted, use a grace period of 2 minutes. A stop-and-wait
         * command Interest is considered "initial" if the validator has not recorded
         * the last timestamp from the same public key, or when such knowledge has been
         * erased. For an initial command Interest, its timestamp is compared to the
         * current system clock, and the command Interest is rejected if the absolute
         * difference is greater than the grace interval. The grace period should be
         * positive. Setting this option to 0 or negative causes the validator to
         * require exactly the same timestamp as the system clock, which most likely
         * rejects all command Interests.
         * @param {number} maxRecords (optional) The maximum number of distinct public
         * keys of which to record the last timestamp. If omitted, use 1000. The
         * validator records the last timestamps for every public key. For a subsequent
         * command Interest using the same public key, its timestamp is compared to the
         * last timestamp from that public key, and the command Interest is rejected if
         * its timestamp is less than or equal to the recorded timestamp.
         * This option limits the number of distinct public keys being tracked. If the
         * limit is exceeded, then the oldest record is deleted.
         * Setting max records to -1 allows tracking unlimited public keys. Setting max
         * records to 0 disables using last timestamp records and causes every command
         * Interest to be processed as initial.
         * @param {number} recordLifetime (optional) The maximum lifetime of a last
         * timestamp record in milliseconds. If omitted, use 1 hour. A last timestamp
         * record expires and can be deleted if it has not been refreshed within the
         * record lifetime. Setting the record lifetime to 0 or negative makes last
         * timestamp records expire immediately and causes every command Interest to be
         * processed as initial.
         * @constructor
         */
        constructor(gracePeriodOrOptions: number | ValidationPolicyCommandInterest.Options, maxRecords: number,
                    recordLifetime: number);
    }

    class LastTimestampRecord {
        /**
         * @param {Name} keyName
         * @param {number} timestamp
         * @param {number} lastRefreshed
         * @constructor
         */
        constructor(keyName: Name, timestamp: number, lastRefreshed: number);
    }
}