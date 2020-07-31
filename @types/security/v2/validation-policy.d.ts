import {Validator} from "./validator";
import {Data} from "../../data";
import {Interest} from "../../interest";
import {ValidationState} from "./validation-state";
import {Name} from "../../name";

export class ValidationPolicy {
    /**
     * ValidationPolicy is an abstract base class that implements a validation
     * policy for Data and Interest packets.
     * @constructor
     */
    constructor();

    /**
     * Set the inner policy.
     * Multiple assignments of the inner policy will create a "chain" of linked
     * policies. The inner policy from the latest invocation of setInnerPolicy
     * will be at the bottom of the policy list.
     * For example, the sequence `this.setInnerPolicy(policy1)` and
     * `this.setInnerPolicy(policy2)`, will result in
     * `this.innerPolicy_ == policy1`,
     * this.innerPolicy_.innerPolicy_ == policy2', and
     * `this.innerPolicy_.innerPolicy_.innerPolicy_ == null`.
     * @param {ValidationPolicy} innerPolicy
     * @throws Error if the innerPolicy is null.
     */
    setInnerPolicy(innerPolicy: ValidationPolicy);

    /**
     * Check if the inner policy is set.
     * @return {boolean} True if the inner policy is set.
     */
    hasInnerPolicy(): boolean;

    /**
     * Get the inner policy. If the inner policy was not set, the behavior is
     * undefined.
     * @return {ValidationPolicy} The inner policy.
     */
    getInnerPolicy(): ValidationPolicy;

    /**
     * Set the validator to which this policy is associated. This replaces any
     * previous validator.
     * @param {Validator} validator The validator.
     */
    setValidator(validator: Validator);

    /**
     * Check the Data or Interest packet against the policy.
     * Your derived class must implement this.
     * Depending on the implementation of the policy, this check can be done
     * synchronously or asynchronously.
     * The semantics of checkPolicy are as follows:
     * If the packet violates the policy, then the policy should call
     * state.fail() with an appropriate error code and error description.
     * If the packet conforms to the policy and no further key retrievals are
     * necessary, then the policy should call continueValidation(null, state).
     * If the packet conforms to the policy and a key needs to be fetched, then
     * the policy should call
     * continueValidation({appropriate-key-request-instance}, state).
     * @param {Data|Interest} dataOrInterest The Data or Interest packet to check.
     * @param {ValidationState} state The ValidationState of this validation.
     * @param {function} continueValidation The policy should call
     * continueValidation() as described above.
     */
    checkPolicy(dataOrInterest: Data | Interest, state: ValidationState, continueValidation: () => any);

    /** Extract the KeyLocator Name from a Data or signed Interest packet.
     * The SignatureInfo in the packet must contain a KeyLocator of type KEYNAME.
     * Otherwise, state.fail is invoked with INVALID_KEY_LOCATOR.
     * @param {Data|Interest} dataOrInterest The Data or Interest packet with the
     * KeyLocator.
     * @param {ValidationState} state On error, this calls state.fail and returns an
     * empty Name.
     * @return {Name} The KeyLocator name, or an empty Name for failure.
     */
    getKeyLocatorName(dataOrInterest: Data | Interest, state: ValidationState): Name;


}