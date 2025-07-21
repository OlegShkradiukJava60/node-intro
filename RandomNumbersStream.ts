export class RandomNumbersStream {
    private amount: number;
    private min: number;
    private max: number;
    private isUnique: boolean;

    constructor(amount: number, min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER, isUnique: boolean = false) {
        this.amount = amount;
        this.min = min;
        this.max = max;
        this.isUnique = isUnique;
    }

    public generate(): number[] {
        const numbers: number[] = [];

        if (this.isUnique) {
            const range = this.max - this.min + 1;

            if (this.amount > range) {
                throw new Error("There are not enough unique numbers in the given range");
            }

            const all: number[] = [];
            for (let i = this.min; i <= this.max; i++) {
                all.push(i);
            }

            while (numbers.length < this.amount) {
                const randomIndex = Math.floor(Math.random() * all.length);
                const value = all[randomIndex];
                numbers.push(value);
                all.splice(randomIndex, 1);
            }
        } else {
            for (let i = 0; i < this.amount; i++) {
                const value = this.getRandomNumber(this.min, this.max);
                numbers.push(value);
            }
        }

        return numbers;
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
