import _ from 'lodash'

const { argv } = process;
const length: number = argv[2] ? +argv[2] : 5
const a: number[] = Array.from({ length }, () => _.random(10, 20));


console.log("random numbers are", a);