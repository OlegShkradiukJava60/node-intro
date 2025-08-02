import { Request, Response, NextFunction } from 'express';

export const validation = (req: Request & { error?: Error },
   res: Response,
   next: NextFunction) => {
   const { operation,
      op1,
      op2
   } = req.body || req.params;

   if (!operation || isNaN(Number(op1)) || isNaN(Number(op2))) {
      req.error = new Error('Invalid input');
      return next(req.error);
   }

   next();
};
