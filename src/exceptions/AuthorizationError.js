const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'Authorization Error';
    }
}
module.exports = AuthorizationError