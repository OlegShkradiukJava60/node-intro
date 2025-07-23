import RandomNumbersStream from "./RandomNumbersStream.ts";
import config from 'config'
interface Params {
    amount: number;
    minValue: number;
    maxValue: number;
}
const AMOUNT_CONFIG_NAME = "amount";
const MIN_VALUE_CONFIG_NAME = "min";
const MAX_VALUE_CONFIG_NAME = "max";
const DEFAULT_AMOUNT_VALUE = 7;
const DEFAULT_MIN_VALUE = 1;
const DEFAULT_MAX_VALUE = 49;
function getParams(): Params {
    const amount: number = getParam(AMOUNT_CONFIG_NAME, DEFAULT_AMOUNT_VALUE);
    const minValue: number = getParam(MIN_VALUE_CONFIG_NAME, DEFAULT_MIN_VALUE);
    const maxValue: number = getParam(MAX_VALUE_CONFIG_NAME, DEFAULT_MAX_VALUE);
    return {amount, minValue, maxValue};

}
function getParam(configName: string, defaultValue: number): number {
    return config.has(configName) ? config.get<number>(configName) : defaultValue;
}
async function displayUniqueRandomNumbers({amount, minValue, maxValue}): Promise<void> {

    return new Promise((resolve, reject) => {
        try {
            const stream = new RandomNumbersStream(amount, minValue, maxValue, true);
            stream.pipe(process.stdout);
            stream.on("end", () => {
                    process.stdout.write("\n");
                    resolve();
            })
            stream.on("error", (err) => reject(err))
        } catch(err) {
            reject(err)
        }
    })
}
displayUniqueRandomNumbers(getParams()).catch(err => console.log(err.message))