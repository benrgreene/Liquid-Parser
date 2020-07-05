/**
 * takes a file path and returns the path starting from the 'src' folder
 *
 * @param {String} path: the full file path
 *
 * @return {String}: prettified path
 */
const prettyPath = (path) => {
  const srcPos = path.indexOf('/src/');
  return srcPos !== -1 ? path.substring(srcPos + 1) : path;
};

/**
 * Adds an error to a file's output
 *
 * @param {String} file: the file to associate the error with
 * @param {String} error: the error to display to the user
 * @param {Object} output: the object containing all file errors
 */
const addErrorToFile = (file, error, output) => {
  output[file] = output[file] || [];
  output[file].push(error);
};

/**
 * Checks a single file's data for errors
 *
 * @param {String} file: the file path of the file to check
 * @param {Object} fileData: the data of the file being checked
 * @param {Object} output: the object containing all errors to output
 *
 * @return {Boolean}: whether the file passed all linting rules
 */
const parseFilesData = (file, fileData, output) => {
  let keptRules = true;
  if (fileData.highestNestedLoop > fileData.maxLoopsDeep) {
    addErrorToFile(file, `had loops nested ${fileData.highestNestedLoop} deep`, output);
    keptRules = false;
  }
  if (fileData.inlineScripts > 0) {
    addErrorToFile(file, `had ${fileData.inlineScripts} inline scripts`, output);
    keptRules = false;
  }
  return keptRules;
};

/**
 * Loops over file data and checks if the file broke any linting rules
 *
 * @param {Object} data: all file data
 */
const output = (data) => {
  let keptRules = true;
  const keys = Object.keys(data);
  const output = {};
  keys.forEach((key) => {
    const fileData = data[key];
    keptRules = parseFilesData(key, fileData, output) && keptRules;
  });
  if (keptRules) {
    console.log('All files passed liquid linting rules');
  } else {
    Object.keys(output).forEach((fileKey) => {
      console.log(`The file ${prettyPath(fileKey)} had the following alerts:`);
      output[fileKey].forEach((issue) => {
        console.log(`  - ${issue}`);
      });
      console.log('\n');
    });
  }
};

export default {
  output,
};
