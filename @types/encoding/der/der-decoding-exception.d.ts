export class DerDecodingException extends Error {
    name: string;

    constructor(error: Error);
}