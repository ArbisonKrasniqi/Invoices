class CustomError extends Error {
    constructor(code = 500, message = "An error occured", data = null) {
        super(message);
        this.code = code;
        this.data = data;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static fromError(error) {
        console.error(error);
        return {
            success: false,
            error: error instanceof CustomError
                ? error
                : new CustomError(500, error.message, null)
        }
    }
}

module.exports = { CustomError };