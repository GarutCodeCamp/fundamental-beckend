const CLientError = require("./ClientError");

class AuthenticationsError extends CLientError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError'
    }
}

module.exports = AuthenticationsError