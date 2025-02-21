import fileSystem from 'file-system';
import path from 'path';

import FileParser from './ParseFile';

const filesToSkip = [
  '.', '..', 'node_modules', '.git', 'dist'
];

/**
 * Scans the WD and any child directories for liquid files and parses them
 *
 * @param {String} wd: The directory to scan
 * @param {Object} options: the options of what is acceptable in the file
 * @param {Object} returnData: object containing all info on what is in each file parsed

 * @return {Object}: object containing all info on what is in each file parsed
 */
const scanDirectory = (wd, options, returnData) => {
  const files = fileSystem.fs.readdirSync(wd);
  files.forEach((file) => {
    // skip current & parent file
    if (filesToSkip.includes(file)) { return; };
    // check the file for if it's a directory or file
    const resolvedPath = path.resolve(wd, file);
    const stats = fileSystem.fs.statSync(resolvedPath);
    if (typeof stats === 'undefined') { return; };
    if (stats.isDirectory()) {
      returnData = {...scanDirectory(resolvedPath, options, returnData)};
    } else if (file.indexOf('.liquid') !== -1) {
      const newData = FileParser.parse(resolvedPath, options);
      returnData[resolvedPath] = newData;
    }
  });
  return returnData;
};

export default {
  scanDirectory,
};
