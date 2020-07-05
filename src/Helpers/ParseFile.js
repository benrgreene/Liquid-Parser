import fileSystem from 'file-system';
import readline from 'readline';
import path from 'path';

import InlineScripts from './Parsers/InlineScripts';
import Loops from './Parsers/Loops';

const plugins = [InlineScripts, Loops];

const optionsTemplate = {
  loopsDeep: 0,
  maxLoopsDeep: 2,
  highestNestedLoop: 0,
  inlineScripts: 0,
};

/**
 * Parses a single liquid file for code quality,
 * and will print out all issues with the file
 *
 * @param {String} filePath: the full file path of the file to parse
 * @param {Object} options: the options of what is acceptable in the file
 *
 * @return {Object} data: the data about what's in the file
 */
const parse = (filePath, options) => {
  const fileContents = fileSystem.fs.readFileSync(filePath, {
    encoding: "utf8"
  });
  let data = {...optionsTemplate, ...options};
  plugins.forEach((plugin) => {
    data = {...plugin.parse(fileContents, data, options)};
  });

  return data;
};

export default {
  parse,
};
