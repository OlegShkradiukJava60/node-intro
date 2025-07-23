import { Readable } from "node:stream";
export default class RandomNumbersStream extends Readable {
    private _uniqueNumbers: Set<number> = new Set();
    private _counter: number = 0;
    constructor(
        private _amount: number,
        private _min: number = Number.MIN_SAFE_INTEGER,
        private _max: number = Number.MAX_SAFE_INTEGER,
        private _isUnique: boolean = false
    ) {
        super();
        checkParameters(_min, _max, _isUnique, _amount);
    }


    _read() {
        if (this._counter >= this._amount) {
            this.push(null)
        } else {
            let number = this._getRandomNumber()
            if (this._isUnique) {
                while (this._uniqueNumbers.has(number)) {
                    number = this._getRandomNumber();
                }
                this._uniqueNumbers.add(number);
            }
            this._counter++;
            this.push(number + "; ")
        }
    }

    private _getRandomNumber() {
        return this._min + Math.round(Math.random() * (this._max - this._min));
    }
}
function checkParameters(_min: number, _max: number, _isUnique: boolean, _amount: number) {
    if (!Number.isInteger(_amount) || _amount < 1) {
        throw new Error("amount value must be a positive integer number")
    }
    if (!Number.isInteger(_min)) {
        throw new Error("minimal value must be an integer number");
    }
    if (!Number.isInteger(_max)) {
        throw new Error("maximal value must be an integer number");
    }
    if (_max <= _min) {
        throw new Error("maximal value must be greater than minimal value");
    }
    const rangeLength = _max - _min + 1;
    if (_isUnique && _amount > rangeLength) {
        throw new Error(`for possible generation of unique integer random numbers the amount must be less or equal ${rangeLength}`);
    }
}
