import { Transform } from "node:stream";
import { TransformCallback } from "stream";
const MAX_SET_SIZE = 100_000;
export default class DistinctLimitStream extends Transform {
  private uniqueStrings: Set<string> = new Set<string>();
  constructor(private _limit: number) {
    super({ objectMode: true });
    if(_limit > MAX_SET_SIZE) {
      throw new Error("Number of the unique values cannot exceed " + MAX_SET_SIZE)
    }
  }
  _transform(
    chunk: any,
    __: BufferEncoding,
    callback: TransformCallback
  ): void {
    const key =
      typeof chunk === "object" ? JSON.stringify(chunk) : chunk.toString();
    if (this.uniqueStrings.size < this._limit) {
      if (!this.uniqueStrings.has(key)) {
        this.uniqueStrings.add(key);
        this.push(chunk);
      }
      callback();
    } else {
      this.push(null);
    }
  }
}
