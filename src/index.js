import fileReader from './Helpers/ReadFiles.js';

/**
 * Processes command line arguments passed to the tool
 *
 * @param {Array} rawArgs: the arguements passed into the parser
 *
 * @return {Array}: the cleaned object containing all the parameters
 */
const processArgs = (rawArgs) => {
  return rawArgs.slice(2);
};

/**
 * Run the tool
 *
 * @param {Array} rawArgs: the arguements passed into the parser
 */
export const runTool = (rawArgs) => {
  const args = processArgs(rawArgs);
  fileReader.scanDirectory('.');
};
