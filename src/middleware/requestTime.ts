import { Request, Response, NextFunction } from 'express';

const requestTime = (req: Request,
    res: Response,
    next: NextFunction) => {
    req.requestTime = new Date().toString();
    next();
};

export default requestTime;
