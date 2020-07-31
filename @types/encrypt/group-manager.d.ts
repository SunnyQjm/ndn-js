import {Name} from "../name";
import {GroupManagerDb} from "./group-manager-db";
import {KeyChain} from "../security/key-chain";
import {Data} from "../data";
import {SyncPromise} from "../util";
import {Schedule} from "./schedule";

export class GroupManager {
    /**
     * A GroupManager manages keys and schedules for group members in a particular
     * namespace.
     * Create a group manager with the given values. The group manager namespace
     * is <prefix>/read/<dataType> .
     * @param {Name} prefix The prefix for the group manager namespace.
     * @param {Name} dataType The data type for the group manager namespace.
     * @param {GroupManagerDb} database The GroupManagerDb for storing the group
     * management information (including user public keys and schedules).
     * @param {number} keySize The group key will be an RSA key with keySize bits.
     * @param {number} freshnessHours The number of hours of the freshness period of
     *   data packets carrying the keys.
     * @param {KeyChain} keyChain The KeyChain to use for signing data packets. This
     * signs with the default identity.
     * @note This class is an experimental feature. The API may change.
     * @constructor
     */
    constructor(prefix: Name, dataType: Name, database: GroupManagerDb, keySize: number,
                freshnessHours: number, keyChain: KeyChain);

    /**
     * Create a group key for the interval into which timeSlot falls. This creates
     * a group key if it doesn't exist, and encrypts the key using the public key of
     * each eligible member.
     * @param {number} timeSlot The time slot to cover as milliseconds since
     * Jan 1, 1970 UTC.
     * @param {boolean} needRegenerate (optional) needRegenerate should be true if
     * this is the first time this method is called, or a member was removed.
     * needRegenerate can be false if this is not the first time this method is
     * called, or a member was added. If omitted, use true. If useSync is specified,
     * then needRegenerate must also be specified (since this can't disambiguate
     * two optional boolean parameters).
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise. If useSync is specified, then needRegenerate must also be
     * specified (since this can't disambiguate two optional boolean parameters).
     * @return {Promise|SyncPromise} A promise that returns a List of Data packets
     * (where the first is the E-KEY data packet with the group's public key and the
     * rest are the D-KEY data packets with the group's private key encrypted with
     * the public key of each eligible member), or that is rejected with
     * GroupManagerDb.Error for a database error or SecurityException for an error
     * using the security KeyChain.
     */
    getGroupKeyPromise(timeSlot: number, needRegenerate?: boolean, useSync?: boolean): Promise<Data[]> | SyncPromise;

    /**
     * Add a schedule with the given scheduleName.
     * @param {string} scheduleName The name of the schedule. The name cannot be
     * empty.
     * @param {Schedule} schedule The Schedule to add.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the schedule is
     * added, or that is rejected with GroupManagerDb.Error if a schedule with the
     * same name already exists, if the name is empty, or other database error.
     */
    addSchedulePromise(scheduleName: string, schedule: Schedule, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete the schedule with the given scheduleName. Also delete members which
     * use this schedule. If there is no schedule with the name, then do nothing.
     * @param {string} scheduleName The name of the schedule.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the schedule is
     * deleted (or there is no such schedule), or that is rejected with
     * GroupManagerDb.Error for a database error.
     */
    deleteSchedulePromise(scheduleName: string, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Update the schedule with scheduleName and replace the old object with the
     * given schedule. Otherwise, if no schedule with name exists, a new schedule
     * with name and the given schedule will be added to database.
     * @param {string} scheduleName The name of the schedule. The name cannot be
     * empty.
     * @param {Schedule} schedule The Schedule to update or add.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the schedule is
     * updated, or that is rejected with GroupManagerDb.Error if the name is empty,
     * or other database error.
     */
    updateSchedulePromise(scheduleName: string, schedule: Schedule, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Add a new member with the given memberCertificate into a schedule named
     * scheduleName. If cert is an IdentityCertificate made from memberCertificate,
     * then the member's identity name is cert.getPublicKeyName().getPrefix(-1).
     * @param {string} scheduleName The schedule name.
     * @param {Data} memberCertificate The member's certificate.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the member is
     * added, or that is rejected with GroupManagerDb.Error if there's no schedule
     * named scheduleName, if the member's identity name already exists, or other
     * database error. Or a promise that is rejected with DerDecodingException for
     * an error decoding memberCertificate as a certificate.
     */
    addMemberPromise(scheduleName: string, memberCertificate: Data, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Remove a member with the given identity name. If there is no member with
     * the identity name, then do nothing.
     * @param {Name} identity The member's identity name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the member is
     * removed (or there is no such member), or that is rejected with
     * GroupManagerDb.Error for a database error.
     */
    removeMemberPromise(identity: Name, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Change the name of the schedule for the given member's identity name.
     * @param {Name} identity The member's identity name.
     * @param {string} scheduleName The new schedule name.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the member is
     * updated, or that is rejected with GroupManagerDb.Error if there's no member
     * with the given identity name in the database, or there's no schedule named
     * scheduleName.
     */
    updateMemberSchedulePromise(identity: Name, scheduleName: string, useSync?: boolean): Promise<any> | SyncPromise;

    /**
     * Delete all the EKeys in the database. The database will keep growing because
     * EKeys will keep being added, so this method should be called periodically.
     * @param {boolean} useSync (optional) If true then return a SyncPromise which
     * is already fulfilled. If omitted or false, this may return a SyncPromise or
     * an async Promise.
     * @return {Promise|SyncPromise} A promise that fulfills when the EKeys are
     * deleted, or that is rejected with GroupManagerDb.Error for a database error.
     */
    cleanEKeysPromise(useSync?: boolean): Promise<any> | SyncPromise;

    static MILLISECONDS_IN_HOUR: number;
}