import _ from 'lodash'
interface Params {
    nNumbers: number;
    minValue: number;
    maxValue: number
}
const DEFAULT_N_NUMBERS = 7;
const DEFAULT_MIN_VALUE = 1;
const DEFAULT_MAX_VALUE = 49;
try {
    const params = getParams();
    printUniqueRandomValues(params)

} catch (error) {
    console.log(error.message)
}

function getParams(): Params {
    const {argv} = process;
    const nNumbers = getNnumbers(argv[2]);
    const minValue = getMinValue(argv[3]);
    const maxValue = getMaxValue(argv[4]);
    if (maxValue <= minValue) {
        throw new Error("Maximal value (argument #3) must be greater than Minimal value (argument #2)")
    };
    if (nNumbers > maxValue - minValue + 1) {
        throw new Error("Amount of the unique random numbers (argument #1) must be equal or less than difference between maximal value (argument #3) and minimal value (argument #2)")
    }
    return {nNumbers, minValue, maxValue}
}

function getNnumbers(param: string | undefined): number {
   let nNumbers = DEFAULT_N_NUMBERS;
   if (param) {
    nNumbers = +param;
    if (!Number.isInteger(nNumbers) || nNumbers < 1) {
        throw new Error("Amount of numbers (argument #1) must be a positive integer number ")
    }

   }
   return nNumbers;
}
function getMinValue(param: string | undefined): number {
    let minValue = DEFAULT_MIN_VALUE;
   if (param) {
    minValue = +param;
    if (!Number.isInteger(minValue)) {
        throw new Error("Minimal value (argument #2) must be an integer number ")
    }

   }
   return minValue;
}
function getMaxValue(param: string | undefined): number {
    let maxValue = DEFAULT_MAX_VALUE;
   if (param) {
    maxValue = +param;
    if (!Number.isInteger(maxValue)) {
        throw new Error("Maximal value (argument #3) must be an integer number ")
    }

   }
   return maxValue;
}
function printUniqueRandomValues(params: Params): void {
    const numbers: number[] = getUniqueRandomNumbers(params);
    console.log(numbers)
}
function getUniqueRandomNumbers({nNumbers, minValue, maxValue}): number[] {
    let length = 0;
    const res: number[] = [];
    while (length < nNumbers) {
        const num = _.random(minValue, maxValue);
        if (!res.includes(num)) {
           length = res.push(num);
        }
    }
    return res;
}