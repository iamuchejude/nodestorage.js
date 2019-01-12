const path = require('path');
const fs = require('fs');
const typeOf = require('gettype.js');

const _createDirectory = require('./createDirectory');

module.exports = function (filePath = null) {
  if (!filePath && typeOf(filePath) !== 'String') {
    throw new TypeError('TypeError');
  }
  
  if (!fs.existsSync(filePath)) {
    _createDirectory(filePath);
    
    return {};
  }

  const storage = {};
  
  try {
    const stats = fs.statSync(filePath);
    
    if (!stats.isDirectory()) {
      _createDirectory(filePath);
      
      return storage;
    }
    
    try {
      const files = fs.readdirSync(filePath);
      
      if (!files) {
        throw new Error('Error: ', err);
      }
      
      if (files.length < 1) return storage;
      
      for (file of files) {
        const data = fs.readFileSync(path.join(filePath, file));

        if (!data) {
          storage[file] = null;
        }

        storage[file] = data.toString();
      }
    } catch (err) {
      throw new Error('nodestorage.js: ', err);
    }
  } catch (err) {
    throw new Error('nodestorage.js: ', err);
  }
    
  return storage;
}