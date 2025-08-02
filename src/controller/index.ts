import express, { Request, Response } from 'express';
import limitRequests from '../middleware/limitRequests.ts';
import requestTime from '../middleware/requestTime.ts';
import { validation } from '../middleware/validation.ts';
import CalculationData from '../model/CalculationData.ts';
import calculator, { WrongOperationError } from '../service/calculator.ts';

const port = 3500;
const app = express();
app.use(express.json());


app.post('/api/calculator', validation, (req: Request & { error?: Error }, res: Response) => {
   try {
      if (!req.body) throw req.error;
      const result = calculator.calculate(req.body as CalculationData);
      sendResponse(res, 200, result);
   } catch (error) {
      const status = error instanceof WrongOperationError ? 404 : 400;
      sendResponse(res, status, (error as Error).message);
   }
});


app.get('/api/calculator/:operation/:op1/:op2', validation, (req: Request & { error?: Error }, res: Response) => {
   try {
      const result = calculator.calculate(req.params as any);
      sendResponse(res, 200, result);
   } catch (error) {
      const status = error instanceof WrongOperationError ? 404 : 400;
      sendResponse(res, status, (error as Error).message);
   }
});

app.post('/api/greet', requestTime, limitRequests, (req: Request, res: Response) => {
   res.json({
      message: 'Hello!',
      requestedAt: req.requestTime,
   });
});

app.get('/api/status', requestTime, (req: Request, res: Response) => {
   res.json({
      status: 'Up and Running',
      requestedAt: req.requestTime,
   });
});


function sendResponse(res: Response, status: number, result: number | string) {
   res.status(status).send(result);
}


app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});


declare global {
   namespace Express {
      interface Request {
         requestTime?: string;
      }
   }
}
