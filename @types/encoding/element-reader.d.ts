export class ElementReader {
    constructor(elementListener: any);

    /**
     * Continue to read data until the end of an element, then call
     * this.elementListener_.onReceivedElement(element). The buffer passed to
     * onReceivedElement is only valid during this call.  If you need the data
     * later, you must copy.
     * @param {Buffer} data The Buffer with the incoming element's bytes.
     */
    onReceivedData(data: Buffer): void;
}