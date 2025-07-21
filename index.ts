import CounterStream from './CounterSteam.js'
const counterStream = new CounterStream(100);
counterStream.pipe(process.stdout);
counterStream.on('end', () => process.stdout.write("\n"))