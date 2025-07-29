import { Writable } from "node:stream";

export default class StdoutStream extends Writable {
    constructor() {
        super({objectMode: true})
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        process.stdout.write(chunk);
        callback();
    }
    _final(callback: (error?: Error | null) => void): void {
        process.stdout.write("\n", callback)
    }
}