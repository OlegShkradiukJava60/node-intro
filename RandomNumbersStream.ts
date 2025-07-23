import { Readable } from "node:stream";

export class RandomNumbersStream extends Readable {
    private amount: number;
    private min: number;
    private max: number;
    private isUnique: boolean;
    private generated: number[] = [];
    private count: number = 0;

    constructor(amount: number, min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER, isUnique: boolean = false, options: any = { encoding: "utf8" }) {
        super(options);
        this.amount = amount;
        this.min = min;
        this.max = max;
        this.isUnique = isUnique;

        if (this.isUnique && (this.max - this.min + 1) < this.amount) {
            throw new Error("Not enough unique numbers in the given range.");
        }
    }

    private getRandomNumber(): number {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    _read(): void {
        while (this.count < this.amount) {
            let value = this.getRandomNumber();

            if (this.isUnique) {
                if (this.generated.includes(value)) {
                    continue;
                }
                this.generated.push(value);
            }

            this.count++;
            const output = value.toString() + "\n";
            this.push(output);
            return;
        }

        this.push(null);
    }
}
