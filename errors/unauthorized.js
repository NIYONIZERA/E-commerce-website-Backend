import CustomError from "./CustomError.js";
export default class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401;
    }
}