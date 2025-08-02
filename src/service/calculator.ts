class WrongOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'WrongOperationError';
    }
}

const calculator = {
    calculate({ operation,
        op1,
        op2
    }: { operation: string; op1: number; op2: number }):
        number {
        switch (operation) {
            case 'add':
                return op1 + op2;
            case 'sub':
                return op1 - op2;
            case 'mul':
                return op1 * op2;
            case 'div':
                if (op2 === 0) throw new Error('Division by zero');
                return op1 / op2;
            default:
                throw new WrongOperationError(`Unknown operation: ${operation}`);
        }
    },
};

export { WrongOperationError };
export default calculator;
