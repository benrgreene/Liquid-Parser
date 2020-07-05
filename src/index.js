import arg from 'arg';
import fileReader from './Helpers/ReadFiles.js';
import dataOutputter from './Helpers/Outputter.js';

/**
 * Processes command line arguments passed to the tool
 *
 * @param {Array} rawArgs: the arguements passed into the parser
 *
 * @return {Array}: the cleaned object containing all the parameters
 */
const processArgs = (rawArgs) => {
  const args = arg(
    {
      // commands
      '--loops-allowed': Number,
      // aliases
      '-l': '--loops-allowed',
    },
    {
      argv: rawArgs.slice(2),
      permissive: true,
    }
  );
  return {
    loopsAllowed: args['--loops-allowed'] ? args['--loops-allowed'] : 2,
  }
};

/**
 * Takes in arguements to the tools and determines/runs a command from them
 *
 * @param {Object} args: the inputed arguements into the script
 */
const runCommand = (args) => {
  const values = Object.values(args);
  const noValues = values.every(option => {
    return !option;
  });

  // set our options for parsing
  const options = {
    maxLoopsDeep: args.loopsAllowed,
  };

  const fileData = fileReader.scanDirectory('.', options, {});
  dataOutputter.output(fileData);
};

/**
 * Run the tool
 *
 * @param {Array} rawArgs: the arguements passed into the parser
 */
export const runTool = (rawArgs) => {
  const args = processArgs(rawArgs);
  runCommand(args);
};
