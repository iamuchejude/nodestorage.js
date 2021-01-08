const Storage = require("./dist/index").default;

const storage = new Storage();

console.log(storage.length);

storage.setItem("name", "Jude");

console.log(storage.length);

storage.setItem("food", "gizdodo");

// storage.clear();

console.log(storage.key(1));
console.log(storage.key(0));
console.log(storage.key(3));
console.log(storage.key(5));

console.log(storage.getItem("name"));

// storage.clear();
