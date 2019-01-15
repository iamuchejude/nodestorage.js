const path = require('path');
const fs = require('fs');
const typeOf = require('gettype.js');

const _createDirectory = require('./createDirectory');

module.exports = function (filePath = null) {
  if (!filePath && typeOf(filePath) !== 'String') {
    throw new TypeError('Invalid argument provided');
  }
  
  if (!fs.existsSync(filePath)) {
    _createDirectory(filePath);
    
    return {};
  }

  const storage = {};
  
  const stats = fs.statSync(filePath);

  if (!stats) {
    throw new Error('not Stats');
  }

  if (!stats.isDirectory()) {
    _createDirectory(filePath);
    
    return storage;
  }
  
  const files = fs.readdirSync(filePath);

  if (!files) {
    throw new Error('not files');
  }
  
  if (typeOf(files) !== 'Array' || files.length < 1) return storage;
  
  for (let file of files) {
    const data = fs.readFileSync(path.join(filePath, file));

    if (!data) {
      storage[file] = null;
    }

    storage[file] = data.toString();
  }
    
  return storage;
}