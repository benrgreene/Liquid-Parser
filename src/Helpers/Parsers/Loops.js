/**
 * Parses a file line by line
 *
 * @param {String} line: the current line being read
 * @param {Object} data: the data containing info about what's in the file
 * @param {Object} options: the options of what is acceptable in the file
 *
 * @return {Object}: the data containing info about what's in the file
 */
const parseLineByLine = (line, data, options) => {
  const includesFor = line.includes('{% for ') || line.includes('{%- for ');
  const includesEndFor = line.includes('{% endfor ') || line.includes('{%- endfor ');
  // check for opening loops
  if (includesFor) {
    data.loopsDeep++;
  }
  if (includesFor && data.loopsDeep > data.highestNestedLoop) {
    data.highestNestedLoop = data.loopsDeep;
  }
  // check if a nested loop is ended
  const forAt = line.indexOf('{% for ') !== -1 ? line.indexOf('{% for ') : line.indexOf('{%- for ');
  const endForAt = line.indexOf('{% endfor ') !== -1 ? line.indexOf('{% endfor ') : line.indexOf('{%- endfor ');
  if ((includesEndFor && forAt === -1) || forAt < endForAt) {
    data.loopsDeep--;
  }
  return data;
};

/**
 * Parses a file and tracks for nested loops
 *
 * @param {String} fileContents: the current file being read
 * @param {Object} data: the data containing info about what's in the file
 * @param {Object} options: the options of what is acceptable in the file
 *
 * @return {Object}: the data containing info about what's in the file
 */
const parse = (fileContents, data, options) => {
  // parse the file for loop issues
  const fileLines = fileContents.split("\n");
  fileLines.forEach((line) => {
    data = {...parseLineByLine(line, data, options)};
  });
  return data;
};

export default {
  parse,
};
