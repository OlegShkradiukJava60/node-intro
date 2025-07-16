
import { readFile, writeFile } from 'node:fs/promises';
import config from 'config';
const INPUT_FILE = "inputFile";
const CODE_FILE = "codeFile";
const COMMENTS_FILE = "commentsFile";
interface Pathes {
inputFile: string;
codeFile: string;
commentsFile: string;
}
function getPathes(): Pathes {
   const inputFile = getConfigProp(INPUT_FILE) as string;
   const codeFile = getConfigProp(CODE_FILE) as string;
   const commentsFile = getConfigProp(COMMENTS_FILE) as string;
   return {inputFile, codeFile, commentsFile}

}
function getConfigProp(prop: string): unknown {
    if(!config.has(prop)) {
    throw new Error(`Property ${prop} must exist in a configuration file`)
   }
   const value = config.get(prop);
   return value;
}
async function getCodeWithComments(inputFile: string): Promise<string[]> {
    const content:string = await readFile(inputFile, {encoding: "utf8"})
    const res = content.split('\n'); 
    return res;
}

interface CodeComments {
    code: string;
    comments: string;
}
function codeCommentsSeparation(codeComments: string[]): CodeComments {
     return codeComments.reduce(reducer, {code: "", comments: ""});
}
function reducer (codeComments: CodeComments, line: string): CodeComments {
    let code = codeComments.code;
    let comments = codeComments.comments;
    const indexComment = line.indexOf("/");
    if (indexComment < 0 || line[indexComment + 1] !== '/') { 
        code += '\n' + line; 
    } else {
        const codePart = line.substring(0, indexComment); 
        comments += '\n' + " ".repeat(codePart.length ? 3 : 0) + line.substring(indexComment);
        codePart.trim() !== "" && (code += '\n' + codePart); 
    }
    return {code, comments}

}
async function main(): Promise<undefined> {
   try {
     const {inputFile, codeFile, commentsFile} = getPathes(); 
     const codeWithComments: string[] = await getCodeWithComments(inputFile); 
     const {code, comments} = codeCommentsSeparation(codeWithComments); 
     const promiseCode = writeFile(codeFile, code); 
     const promiseComments = writeFile(commentsFile, comments);
     await Promise.all([promiseCode, promiseComments]);
     console.log(`code is saved to file ${codeFile}`);
     console.log(`comments are saved to file ${commentsFile}`);
   } catch (error) {
       console.log(error.message)
   }

}
main();