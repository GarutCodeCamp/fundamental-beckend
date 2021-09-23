const CLientError = require('./ClientError');

class InvariantError extends CLientError {
    constructor(message) {
        super(message);
        this.name = 'InvariantError'
    }
}
module.exports = InvariantError