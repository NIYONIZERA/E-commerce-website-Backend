import CustomError from "./CustomError.js";

export default class NotFoundError extends CustomError{
    constructor(message){
        super(message)
        this.statusCode=400;
    }
}