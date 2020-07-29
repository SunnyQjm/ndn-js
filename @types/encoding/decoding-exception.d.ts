export class DecodingException extends Error {
    name: string;

    constructor(error: Error);
}