import RandomNumbersStream from "./RandomNumbersStream.ts";
import DistinctLimitStream from "./DistinctLimitStream.ts";
import StdoutStream from "./StdoutStream.ts";
import { pipeline } from "node:stream/promises";
import FormatStream from "./FormatStream.ts";
export default async function displayUniqueRandomNumbers({
  minValue,
  maxValue,
  amount,
  delimiter
}) {
  const maxAmount = maxValue - minValue + 1;
  if (amount > maxAmount) {
    throw new Error(`amount cannot be greater than ${maxAmount}`);
  }
  await pipeline(
    new RandomNumbersStream(minValue, maxValue),
    new DistinctLimitStream(amount),
    new FormatStream(delimiter),
    new StdoutStream()
  );
}
