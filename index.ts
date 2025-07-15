import { readFile, writeFile } from 'node:fs/promises';
import config from 'config';

interface PathsConfig {
    inputFilePath: string;
    codeOutputPath: string;
    commentsOutputPath: string;
}

async function printFile(path: string) {
    const content = await readFile(path, { encoding: 'utf8' });
    console.log(`\n*** Content ${path} ***\n${content}`);
}
async function writeToFile(path: string, content: string) {
    await writeFile(path, content, { encoding: 'utf8' });
}

async function separateCommentsAndCode() {
    const { inputFilePath, codeOutputPath, commentsOutputPath } =
        config as unknown as PathsConfig;

    const raw = await readFile(inputFilePath, { encoding: 'utf8' });
    const lines = raw.split(/\r?\n/);

    const codeLines: string[] = [];
    const commentLines: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('//')) {
            commentLines.push(line);
        } else if (trimmed.includes('//')) {
            const [codePart, commentPart] = line.split('//');
            codeLines.push(codePart.trimEnd());
            commentLines.push('//' + commentPart.trim());
        } else if (trimmed.length > 0) {
            codeLines.push(line);
        }
    }

    await writeToFile(codeOutputPath, codeLines.join('\n'));
    await writeToFile(commentsOutputPath, commentLines.join('\n'));

    console.log('Separation of code and comments is complete.');
    await printFile(codeOutputPath);
    await printFile(commentsOutputPath);
}

separateCommentsAndCode().catch(err => console.error(err));
