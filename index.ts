import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import config from "config";

const nNumbers: number = config.get("nNumbers");
const minValue: number = config.get("minValue");
const maxValue: number = config.get("maxValue");

const stream = new RandomNumbersStream(nNumbers, minValue, maxValue, true);

console.log("Generated numbers:");
stream.on("data", (chunk) => {
    process.stdout.write(chunk);
});

stream.on("end", () => {
    console.log("Stream finished");
});
