
import displayUniqueRandomNumbers from "./display_unique_numbers.ts";
import config from "config";
interface Params {
  minValue: number;
  maxValue: number;
  amount: number;
  delimiter: string
}
const MIN_VALUE_CONFIG_NAME = "min";
const MAX_VALUE_CONFIG_NAME = "max";
const AMOUNT_VALUE_CONFIG_NAME = "amount";
const DELIMITER_VALUE_CONFIG_NAME = "delimiter";
 const DEFAULT_DELIMITER_VALUE = "; ";
const DEFAULT_MIN_VALUE = 1;
const DEFAULT_MAX_VALUE = 49;
const DEFAULT_AMOUNT = 7;
function getParams(): Params {
  const minValue = getParamNumber(MIN_VALUE_CONFIG_NAME, DEFAULT_MIN_VALUE);
  const maxValue = getParamNumber(MAX_VALUE_CONFIG_NAME, DEFAULT_MAX_VALUE);
  const amount = getParamNumber(AMOUNT_VALUE_CONFIG_NAME, DEFAULT_AMOUNT);
  const delimiter = getParamString(DELIMITER_VALUE_CONFIG_NAME, DEFAULT_DELIMITER_VALUE);
  return { minValue, maxValue, amount, delimiter };
}
function getParamNumber(configName: string, defaultValue: number): number {
  const res: number = config.has(configName)
    ? config.get<number>(configName)
    : defaultValue;
  if (typeof res != "number") {
    throw new Error(
      `Value of ${configName} parameter is "${res}" but must be a number`
    );
  }
  return res;
} 
function getParamString(configName: string, defaultValue: string): string {
     const res: string = config.has(configName)
    ? config.get<string>(configName)
    : defaultValue;
  if (typeof res != "string") {
    throw new Error(
      `Value of ${configName} parameter is "${res}" but must be a string`
    );
  }
  return res;
}
(async () => {
  try {
    await displayUniqueRandomNumbers(getParams());
  } catch (error) {
    console.log(error.message);
  }
})();
