import { CustomError } from "./customError";

export class NotAuthenticated extends CustomError {
    statusCode = 401;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, NotAuthenticated.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
    
}