
import { validation } from '../middleware/validation.ts';
import CalculationData from '../model/CalculationData.ts';
import calculatorService from '../service/calculator.ts';
import express ,{Response, Request} from 'express'
import morgan from 'morgan';
import 'dotenv/config'
import errorHandler from '../middleware/errorsHandler.ts';
import { CalculationDataSchema } from '../middleware/schemos.ts';
const port = process.env.PORT || 3500;




const app = express();
app.listen(port, () => console.log(port));
app.use(express.json({limit: '1Mb'}));
app.use(morgan('tiny'))
app.use(validation(CalculationDataSchema))
app.post("/api/calculator", (req: Request & {error: Error}, res: Response) => {
 
    const result = calculatorService.calculate(req.body as CalculationData)
    sendResponse(res, 200, result);
 
})
app.get("/api/calculator",  (req: Request & {error: Error}, res: Response) => {
   
    const result = calculatorService.calculate(req.query as any)
    sendResponse(res, 200, result);
  })
app.get("/api/calculator/:operation/:op1/:op2", validation(CalculationDataSchema), (req: Request & {error: Error}, res: Response) => {
   
    const result = calculatorService.calculate(req.params as any)
    sendResponse(res, 200, result);



})
app.use(errorHandler)
function sendResponse(res: Response, status: number, result: number | string) {
      res.statusCode = status;
      res.send(result)
}

