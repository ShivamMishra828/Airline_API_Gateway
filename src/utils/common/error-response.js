class ErrorResponse {
    constructor(error, message) {
        this.success = false;
        this.message = message;
        this.data = {};
        this.error = error;
    }
}

module.exports = ErrorResponse;
