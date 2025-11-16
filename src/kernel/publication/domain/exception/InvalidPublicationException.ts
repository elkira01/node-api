export class InvalidPublicationException extends Error {
    constructor(message: string) {
        super(`Invalid publication: ${message}`)
    }
}
