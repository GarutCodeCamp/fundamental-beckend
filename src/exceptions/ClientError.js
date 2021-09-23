class CLientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'Client Error';
    }
}
module.exports = CLientError;