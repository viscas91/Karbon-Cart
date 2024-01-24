import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors/customError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    console.log(err, err.stack);

    return res.status(400).send({
        errors: [{ message: 'Something went wrong'}],
    });
}