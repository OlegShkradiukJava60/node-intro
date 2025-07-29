import { Readable } from "node:stream";
export default class RandomNumbersStream extends Readable {
    private _length: number;
    constructor(private _min: number, private _max: number)
    {
        super({objectMode: true});

        if (_max <= _min) {
            throw new Error(" maximal value must be greater than minimal value")
        }
        this._length = this._max - this._min;
    }
    _read(__: number): void {
        this.push(Math.round(this._min + Math.random() * this._length) )
    }
   
}