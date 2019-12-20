import fileSystem from 'file-system';
import path from 'path';

const filesToSkip = [
  '.', '..', 'node_modules', '.git', 'dist'
];

/**
 * Scans the WD and any child directories for liquid files and parses them
 *
 * @param {String} wd: The directory to scan
 */
const scanDirectory = (wd) => {
  fileSystem.fs.readdir(wd, (err, files) => {
    files.forEach((file) => {
      // skip current & parent file
      if (filesToSkip.includes(file)) { return; };
      // check the file for if it's a directory or file
      const resolvedPath = path.resolve(wd, file);
      fileSystem.fs.stat(resolvedPath, (err, stats) => {
        if (typeof stats === 'undefined') { return; };
        if (stats.isDirectory()) {
          scanDirectory(resolvedPath);
        } else {
          console.log(resolvedPath);
        }
      })
    });
  });
};

export default {
  scanDirectory,
};
