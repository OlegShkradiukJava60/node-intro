import http from 'node:http';
import CalculationData from '../model/CalculationData.ts';
import calculator, { WrongOperationError } from '../service/calculator.ts'
const server = http.createServer();
const port = 3500;

server.listen(port, () => console.log('listening on port ' + port));
server.on("request", async (req, res) => {
  res.statusCode = 200;
  
 try {
   const calculationData: CalculationData = await getData(req);
   const result = calculator.calculate(calculationData);
   sendResponse(res, 200, result);
 } catch (error) {
   const statusCode = error instanceof WrongOperationError ? 404 : 400
   sendResponse(res, statusCode, error.message)
 }
  
})
function sendResponse(res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; }, statusCode: number, result: number | string) {
   res.statusCode = statusCode;
   res.end(result + "");
}

async function getData(req: http.IncomingMessage): Promise<CalculationData> {
   let data = "";
   for await (let chunk of req) {
      data += chunk;
   }
   const parsedData = JSON.parse(data);
   dataValidation(parsedData)
   return parsedData as CalculationData;
}
function dataValidation(parsedData: any): void {
   if (!parsedData.operation || typeof parsedData.operation != "string") {
      throw new Error("field operation of 'string' type must exist")
   }
   if (!parsedData.op1 || typeof parsedData.op1 != "number") {
      throw new Error("field op1 of 'number' type must exist")
   }
   if (!parsedData.op2 || typeof parsedData.op2 != "number") {
      throw new Error("field op2 of 'number' type must exist")
   }
}

