const path = require('path');
const fs = require('fs');
const typeOf = require('gettype.js');

module.exports = function (dir = null) {
  if (!dir || typeOf(dir) !== 'String') {
    throw new TypeError('Invalid argument provided');
  }

  try {
    fs.mkdirSync(dir);
    return;
  } catch (err) {
    throw Error('Can\'t create directory');
  }
}
