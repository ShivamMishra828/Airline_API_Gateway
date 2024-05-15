class SuccessResponse {
    constructor(data, message) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.error = {};
    }
}

module.exports = SuccessResponse;
