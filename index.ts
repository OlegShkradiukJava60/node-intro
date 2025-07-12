import _ from 'lodash';

const args = process.argv;

let count = args[2] ? Number(args[2]) : 7;
let min = args[3] ? Number(args[3]) : 1;
let max = args[4] ? Number(args[4]) : 49;

if (isNaN(count) || isNaN(min) || isNaN(max)) {
    console.log("Error:only numbers");
    process.exit(1);
}

if (min > max) {
    console.log("Error: min > max");
    process.exit(1);
}

if (count > max - min + 1) {
    console.log("Error: not enough unique numbers");
    process.exit(1);
}

const numbers: number[] = [];

while (numbers.length < count) {
    const num = _.random(min, max);
    if (!numbers.includes(num)) {
        numbers.push(num);
    }
}

numbers.sort((a, b) => a - b);

console.log("Your numbers:", numbers);