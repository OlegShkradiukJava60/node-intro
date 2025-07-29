import { Transform, TransformCallback } from "node:stream";
export default class FormatStream extends Transform {
    private isFirst = true;
    constructor(private _delimiter = "; ") {
        super({objectMode: true})
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        this.push((this.isFirst ? "" : this._delimiter) + chunk );
        this.isFirst = false;
        callback()
    }
}