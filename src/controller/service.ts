interface CalcData {
    operation: string;
    op1: number;
    op2: number;
}

export function compute(data: CalcData): number {
    const { operation, op1, op2 } = data;

    switch (operation) {
        case "add":
            return op1 + op2;
        case "sub":
            return op1 - op2;
        case "mul":
            return op1 * op2;
        case "div":
            if (op2 === 0) throw new Error("Division by zero");
            return op1 / op2;
        default:


            throw new Error("Unknown operation: " + operation);
    }
}
