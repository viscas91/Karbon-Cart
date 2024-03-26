import { CustomError } from "./customError";

export class NoContentError extends CustomError {
    statusCode = 204;

    constructor(public message: string){
        super(message)

        Object.setPrototypeOf(this, NoContentError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}