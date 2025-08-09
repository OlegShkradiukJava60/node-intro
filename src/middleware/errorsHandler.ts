import {Request, Response, NextFunction} from 'express'
import {ZodError} from 'zod'
import { WrongOperationError } from '../service/calculator.ts';
const errorHandler = (error: Error, _: Request, res: Response, __: NextFunction) => {
const status = error instanceof WrongOperationError ? 404 : 400;
   res.statusCode = status;
   const message = error instanceof ZodError ? getZodMessage(error) : error.message;
   res.end(message);
}
export default errorHandler;

function getZodMessage(error: ZodError) : string{
    return error.issues.reduce((res: string, iss) => res + `${res ? '; ':''}${String(iss.path[0])}: ${iss.message}`, "")
}
