export class WrongOperationError {
    constructor(public message: string) {
       
    }
}
 class CalculatorService {
    private  calculations: Record<string, (op1:number, op2:number)=>number> = {
       "+": (op1, op2) => op1 + op2,
       "*": (op1, op2) => op1 * op2,
       "-": (op1, op2) => op1 - op2,
       "/": (op1, op2) => op1 / op2,

    }
    calculate({operation, op1, op2}): number {
        if (!this.calculations[operation]) {
            throw new WrongOperationError(`operation "${operation}" is unsupported`)
        }
        return this.calculations[operation](op1, op2)
    }
}
const calculatorService = new CalculatorService();
export default calculatorService;