'use strict';

const fs = require('fs');
const path = require('path');
const typeOf = require('gettype.js');
const basePath = require('pkg-dir');

const _createDirectory = require('./util/createDirectory');
const _readStorage = require('./util/readStorage');

const Storage = function (options = null) {
  let nsParentDirectory = path.join(basePath.sync(__dirname), 'node_storage');

  if (!fs.existsSync(nsParentDirectory)) {
    _createDirectory(nsParentDirectory);
  }

  if (options && typeOf(options) == 'Object' && options.dir) {
    this._path = path.resolve(path.join(nsParentDirectory, `.${options.dir.replace(/[^\w\s]/gi, '').toLowerCase().replace(' ', '_')}`));
  } else {
    throw new Error('Please privide a configuration for storage');
  }

  try {
    const stats = fs.statSync(this._path);

    if (!stats.isDirectory()) {
      throw new TypeError('Error: ', 'Path exist but is not a directory');
    }
  } catch (e) {
    _createDirectory(this._path);
  }

  this.length = Object.keys(_readStorage(this._path)).length;

  return {
    ..._readStorage(this._path),
    length: this.length,
  }
}

Storage.prototype.getItem = function (key = null) {
  if (!key) {
    throw new TypeError('Uncaught TypeError: type error message');
  }

  const storage = _readStorage(this._path);

  if (key.toString() in storage) {
    return storage[key];
  }

  return null;
}

Storage.prototype.setItem = function (key = null, value = null) {
  if (!key || !value) {
    throw new TypeError('Uncaught TypeError: type error');
  }

  fs.writeFile(`${this._path}/${key.toString()}`, value, (err) => {
    if (err) throw err;
    
    return;
  })
}

Storage.prototype.removeItem = function (key) {
  if (!key) {
    throw new TypeError('Uncaught TypeError: type error');
  }

  try {
    const stats = fs.statSync(`${this._path}/${key}`);

    if (!stats) return;

    if (!stats.isFile()) return;
  } catch (e) {
    return;
  }

  fs.unlink(`${this._path}/${key}`, (err) => {
    if (err) {
      if (err.code === 'ENOENT') return;
      throw new Error('Error: ', error);
    }

    return;
  });
}

Storage.prototype.clear = function () {
  if (!fs.existsSync(this._path)) return;

  if (!fs.statSync(this._path).isDirectory()) return;

  if (this.length < 1) return;

  try {
    const files = fs.readdirSync(this._path);

    for (file of files) {
      fs.unlink(path.join(this._path, file), err => {
        if (err) {
          throw err;
        }
      });
    }

    return;

  } catch (err) {
    throw err;
  }
}

Storage.prototype.key = function (index) {
  return Object.keys(_readStorage(this._path))[index];
}

module.exports = Storage;