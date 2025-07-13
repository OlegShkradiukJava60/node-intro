import os from 'node:os';

const MGB_FACTOR = 1024 * 1024;

console.log(`free memory is ${Math.round(os.freemem() / MGB_FACTOR)} Mgb`);
console.log(`total memory is ${Math.round(os.totalmem() / MGB_FACTOR)} Mgb`);
console.log(`number of CPUs is ${os.cpus().length}`);
