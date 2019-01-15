# nodestorage.js

> File manager storage utility for Node with `localStorage` like API

## Install

```sh
$ npm i nodestorage.js
```

## Usage

```js
const nodeStorage = require('nodestorage.js');

const storage = new nodeStorage({ dir: 'storage' });

console.log(storage);
/*
  => {
    _path: {storagePath},
    length: 0,
  }
*/

storage.setItem('name', 'nodestorage.js');
// set value of name to nodeStorage.js

```

## API

### storage.setItem('key', 'value')

Set the value of `key` to `value`

### storage.getItem(key);

Returns the value of `key`

### storage.removeItem(key)

Remove `key` and its value from storage

### storage.key(index)

Returns `key` at the index in storage

### storage.clear()

Clears storage

### storage.length

Returns a count of data in storage

### storage._path

Return storage path


## Contributing
Do you find this project interesting and fee like you can make any part of it better? Feel free to raise a PR as it will be greatly appreciated

## Issues
Did you find something that is not fine about this project? Do you have a feature that you feel should be added? Are you having problems with using this library in your project?  Kindly create an issue stating what the problem is. The awesome OS community will see that your issue is resolved.

## How can you support?
Contributing to this project and raising issues are very good ways to support. Another way to support is to start this repository.

## License

MIT @ [Uche Jude](https://iamuchejude.com)
