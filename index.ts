import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import config from "config";

const nNumbers: number = config.get("nNumbers");
const minValue: number = config.get("minValue");
const maxValue: number = config.get("maxValue");

const generator = new RandomNumbersStream(nNumbers, minValue, maxValue, true);

const numbers = generator.generate();

console.log("Generated numbers:", numbers);
