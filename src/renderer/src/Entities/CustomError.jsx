class CustomError extends Error {
    constructor (code, message, data = null) {
        super(message);
        this.code = code;
        this.message = message;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }

    static fromError(error) {
        if (error instanceof CustomError) {
            return error;
        } else {
            return new CustomError(
                error.code || 500,
                error.message || 'An unexpected error occurred',
                error.details || error.data || null
            );
        }
    }
}

export default CustomError