const ResponseTypes = Object.freeze({
    ERROR: 'error',
    SUCCESS: 'success'
})

export class Response {
    constructor(type, message) {
        if (!Object.values(ResponseTypes).includes(type)) {
            throw new Error(`Invalid response type: ${type}`);
        }
        this.type = type;
        this.message = message;
    }
}