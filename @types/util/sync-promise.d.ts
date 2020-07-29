export class SyncPromise {
    constructor(value: any, isRejected: boolean);

    /**
     * If this promise is fulfilled, immediately call onFulfilled with the fulfilled
     * value as described below. Otherwise, if this promise is rejected, immediately
     * call onRejected with the error as described below.
     * @param {function} onFulfilled (optional) If this promise is fulfilled, this
     * calls onFulfilled(value) with the value of this promise and returns the
     * result. The function should return a promise. To use all synchronous code,
     * onFulfilled should return SyncPromise.resolve(newValue).
     * @param {function} onRejected (optional) If this promise is rejected, this
     * calls onRejected(err) with the error value of this promise and returns the
     * result. The function should return a promise. To use all synchronous code,
     * onFulfilled should return SyncPromise.resolve(newValue) (or throw an
     * exception).
     * @return {Promise|SyncPromise} If this promise is fulfilled, return the result
     * of calling onFulfilled(value). Note that this does not create a promise which
     * is scheduled to execute later. Rather it immediately calls onFulfilled which
     * should return a promise. But if onFulfilled is undefined, simply return this
     * promise to pass it forward. If this promise is rejected, return the result of
     * calling onRejected(err) with the error value. But if onRejected is undefined,
     * simply return this promise to pass it forward. However, if onFulfilled or
     * onRejected throws an exception, then return a new SyncPromise in the rejected
     * state with the exception.
     */
    then(onFulfilled?: any, onRejected?: any): SyncPromise;

    /**
     * Call this.then(undefined, onRejected) and return the result. If this promise
     * is rejected then onRejected will process it. If this promise is fulfilled,
     * this simply passes it forward.
     */
    catch(onRejected: any): SyncPromise;

    /**
     * Return a new SyncPromise which is already fulfilled to the given value.
     * @param {any} value The value of the promise.
     */
    static resolve(value: any): SyncPromise;

    /**
     * Return a new SyncPromise which is already rejected with the given error.
     * @param {any} err The error for the rejected promise.
     */
    static reject(err: any): SyncPromise;

    /**
     * This static method checks if the promise is a SyncPromise and immediately
     * returns its value or throws the error if promise is rejected. If promise is
     * not a SyncPromise, this throws an exception since it is not possible to
     * immediately get the value. This can be used with "promise-based" code which
     * you expect to always return a SyncPromise to operate in synchronous mode.
     * @param {SyncPromise} promise The SyncPromise with the value to get.
     * @return {any} The value of the promise.
     * @throws Error If promise is not a SyncPromise.
     * @throws any If promise is a SyncPromise in the rejected state, this throws
     * the error.
     */
    static getValue(promise: SyncPromise): any

    /**
     * This can be called with complete(onComplete, promise) or
     * complete(onComplete, onError, promise) to handle both synchronous and
     * asynchronous code based on whether the caller supplies the onComlete callback.
     * If onComplete is defined, call promise.then with a function which calls
     * onComplete(value) when fulfilled (possibly in asynchronous mode). If
     * onComplete is undefined, then we are in synchronous mode so return
     * SyncPromise.getValue(promise) which will throw an exception if the promise is
     * not a SyncPromise (or is a SyncPromise in the rejected state).
     * @param {function} onComplete If defined, this calls promise.then to fulfill
     * the promise, then calls onComplete(value) with the value of the promise.
     * If onComplete is undefined, the return value is described below.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {function} onError (optional) If defined, then onComplete must be
     * defined and if there is an error when this calls promise.then, this calls
     * onError(err) with the value of the error. If onComplete is undefined, then
     * onError is ignored and this will call SyncPromise.getValue(promise) which may
     * throw an exception.
     * NOTE: The library will log any exceptions thrown by this callback, but for
     * better error handling the callback should catch and properly handle any
     * exceptions.
     * @param {Promise|SyncPromise} promise If onComplete is defined, this calls
     * promise.then. Otherwise, this calls SyncPromise.getValue(promise).
     * @return {any} If onComplete is undefined, return SyncPromise.getValue(promise).
     * Otherwise, if onComplete is supplied then return undefined and use
     * onComplete as described above.
     * @throws Error If onComplete is undefined and promise is not a SyncPromise.
     * @throws any If onComplete is undefined and promise is a SyncPromise in the
     * rejected state.
     */
    static complete(onComplete: any, onError: (err: any) => any, promise: SyncPromise | Promise<any>) : any;
    static complete(onComplete: any, promise?: SyncPromise | Promise<any>) : any;
}