import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import  { ZodType } from "zod";

export function validation(schema: ZodType<any, any, any>): (req: Request, res: Response, next: NextFunction)=>void {
 return (req: Request, __: Response, next: NextFunction) => { let obj: any = req.body;
  if (!obj || _.isEmpty(obj)) {
    obj = !req.params || _.isEmpty(req.params) ? req.query : req.params;
  }
  if (!_.isEmpty(obj)) {
   req.body = schema.parse(obj)
  }
  next();}
}
