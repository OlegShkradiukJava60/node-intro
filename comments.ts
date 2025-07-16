
//names of the file path configuration properties
//Pathes - interface defining object type containing all required file path values
// getPathes - function returning object of type Pathes with all required file path values
// getConfigProp - reusable function for getting one value of unknown type from a config file
// getCodeWithComments - function returning lines from the input file as an array of strings
   //getting array of strings separated by new line symbol
// CodeComments - interface defining type with code and comments
// codeCommentsSeparation - function returning object with code and comments fields
// reducer - callback for reducing in the function codeCommentsSeparation
   //additional condition for avoiding "//" in the example code
   //line contains only code
   //line contains comments
   //line contains both code and comments
// main - integration controller function
   //1 - getting all file path values
   //2 - getting code with comments
   //3 - getting object with separated code and comments
   //4 - simultaneous writing code and comments to appropriate files
   //5 - waiting for finishing saving actions
   //6 - logging finishing of savings