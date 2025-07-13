import { readFile, writeFile } from 'node:fs/promises';
async function printFile(path: string) {
    const content = await readFile(path, { encoding: "utf8" });
    console.log(content)

}
async function writeToFile(path: string, content: string) {
    writeFile(path, content);
}
(async () => {
    await writeToFile("hello1.txt", "Hello Universe");
    await printFile("hello1.txt")
})();