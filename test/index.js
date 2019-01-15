const { expect } = require('chai');
const typeOf = require('gettype.js');
const nodeStorage = require('../src');

let storage;
let anotherStorage;

describe('Node Storage', () => {
  before(() => {
    storage = new nodeStorage({ dir: 'storage' });
    anotherStorage = new nodeStorage({ dir: 'anotherstorage' });
  });

  after(() => {
    // Delete parent storage folder
    const rimraf = require('rimraf');
    const dirPath = require('path').resolve(require('pkg-dir').sync(__dirname), 'ns');

    rimraf.sync(dirPath);
  });

  describe('Instance of Storage', () => {
    it (`should have _path and length properties`, () => {
      expect(storage._path).to.exist;
      expect(storage.length).to.exist;
      expect(storage.length).to.equal(0);
    });
  });

  describe('setItem(key:string|key:number, value:string|value:number)', () => {
    it ('set item in Storage', () => {
      expect(storage.setItem('name', 'Storage')).to.not.be.false;
      expect(storage.setItem('brain', 'Trying to be smart')).to.not.be.false;
      expect(storage.setItem('language', 'PHP')).to.not.be.false;
      expect(storage.setItem(1, 'Two')).to.not.be.false;
    });

    it ('should be able to replace the value of an existing item', () => {
      expect(storage.setItem('language', 'JavaScript'));
      expect(storage.setItem('1', 'One'));
    });
  });

  describe('getItem(key:string|key:number)', () => {
    it ('should return value of an item', () => {
      expect(storage.getItem('name')).to.equal('Storage');
      expect(storage.getItem(1)).to.equal('One');
      expect(storage.getItem('1')).to.equal('One');
      expect(storage.getItem('language')).to.not.equal('PHP');
      expect(storage.getItem('language')).to.equal('JavaScript');
    });

    it ('should return null for data that don\'t exist', () => {
      expect(storage.getItem('randomKey')).to.equal(null);
      expect(storage.getItem('anotherRandomKey')).to.equal(null);
    })
  });

  describe('removeItem(key:string|key:number)', () => {
    it ('should remove item', () => {
      expect(storage.removeItem('language')).to.not.be.false;
      expect(storage.removeItem('1')).to.not.be.false;
    });

    it ('should return null for removed items ', () => {
      expect(storage.getItem(1)).to.equal(null);
      expect(storage.getItem('language')).to.equal(null);
    });
  });

  describe('key(index:number)', () => {
    it ('should return the key of data in the index provided', () => {
      expect(storage.key(1)).to.equal('name');
      expect(storage.key(0)).to.equal('brain');
    });

    it ('should return null of invalid index', () => {
      expect(storage.key(4)).to.equal(null);
      expect(storage.key(200)).to.equal(null);
    })
  });

  describe('new install of storage with different configuration should have a different path', () => {
    it ('should support new instance of storage', () => {
      expect(storage._path).to.not.equal(anotherStorage._path);
    });
  });

  describe ('different instance of storage should store different value as provided', () => {
    it ('should store data in in each path', () => {
      expect(anotherStorage.setItem('home', 'Another Storage'));
      expect(storage.setItem('home', 'Storage'));
    });

    it ('should return false', () => {
      expect(anotherStorage.getItem('home')).to.not.equal(storage.getItem('home'));
    });
  });
  
  describe('should clear storage', () => {
    it ('should clear storage', () => {
      expect(storage.clear()).to.not.be.false;
      expect(anotherStorage.clear()).to.not.be.false;
    });
    
    it ('should have length of 0 after .clear() is called', () => {
      expect(storage.length).to.equal(0);
      expect(anotherStorage.length).to.equal(0);
    });
  });
});