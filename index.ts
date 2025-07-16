import EventEmitter from "events";
const emitter = new EventEmitter();

emitter.on("message", (arg: string) => {
    if (arg.toLowerCase().includes("hello")) {
        throw new Error("Hello detected!");
    }
})

emitter.on("message", (arg: any) => {
    console.log("Event received!", `The message contains ${arg}`);
});
emitter.on("message", (arg: string) => {
    console.log(`Received: ${arg.length}`);
});

console.log("Registered events:", emitter.eventNames());

emitter.emit("message", "Hell, World!");
emitter.emit("message", "Hell");
