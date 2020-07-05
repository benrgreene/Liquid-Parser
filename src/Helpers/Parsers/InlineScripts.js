/**
 * Parses a file and checks for inline scripts
 *
 * @param {String} fileContents: the file being read
 * @param {Object} data: the data containing info about what's in the file
 * @param {Object} options: the options of what is acceptable in the file
 *
 * @return {Object}: the data containing info about what's in the file
 */
const parse = (fileContents, data, options) => {
  let startIndex = -1;
  while (startIndex = fileContents.indexOf('<script', startIndex + 1)) {
    if (startIndex === -1) {
      break;
    }
    const srcIndex = fileContents.indexOf('src=', startIndex);
    const endIndex = fileContents.indexOf('>', startIndex);
    if (srcIndex === -1 || srcIndex >= endIndex) {
      data.inlineScripts++;
    }
  }
  return data;
};

export default {
  parse,
};
