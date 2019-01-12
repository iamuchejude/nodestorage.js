const ns = require('./src');

const firstStorage = new ns({ dir: 'firststorage' });
const secondStorage = new ns({ dir: 'secondstorage' });
// const thirdStorage = new ns({ dir: 'thirdstorage' });

console.log('First Storage', firstStorage);
console.log('Second Storage', secondStorage);
// console.log('Third Storage', thirdStorage);
