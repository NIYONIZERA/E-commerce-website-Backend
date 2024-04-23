import CustomError from "./CustomError.js";

export default class BadRequestError extends CustomError{
    constructor(message){
        super(message)
        this.statusCode=400;
    }
    
}