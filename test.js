const { local } = require(".");

/*
## Testing Local Storage System:
#### Methods:
- `basicDB.local.set(key, value)`
- `basicDB.local.get(key)`
- `basicDB.local.delete(key)`
*/

// key:value::foo:bar
const key = "foo";
const value = "bar";

// Test
local.set(key, value);

if (local.get(key) !== value) {
    throw "Test Failed: method: local.set or local.get";
}

local.delete(key);

if (local.get(key)) {
  throw "Test Failed: method: local.delete"
}

console.log("Test Passed: All Local Basic-DB Methods are working!");
