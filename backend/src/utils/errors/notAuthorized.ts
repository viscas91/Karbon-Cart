import { CustomError } from "./customError";

export class NotAuthorized extends CustomError {
    statusCode = 403;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, NotAuthorized.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
    
}