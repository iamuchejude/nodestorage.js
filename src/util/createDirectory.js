const path = require('path');
const fs = require('fs');
const typeOf = require('gettype.js');

module.exports = function (dir = null) {
  if (!dir || typeOf(dir) !== 'String') {
    throw new TypeError('TypeError');
  }

  fs.mkdir(dir, (err) => {
    if (err) {
      throw new Error('Test', err);
    }

    return;
  })
}