# `basic-db`
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test](https://github.com/moreavy/basic-db/actions/workflows/test.yml/badge.svg)](https://github.com/moreavy/basic-db/actions/workflows/test.yml)
## Usage
### Local Storage
The database can store simple *key-value* storage in a local method.
```js
const { local } = require("basic-db");
local.set("foo", "bar"); // will save the string, number, boolean, nulls and arrays or objects containing these in the database
var output = local.get("foo"); // will return the value which was set in the database
local.delete("foo"); // will delete the the data stroed are the key i.e. "foo"
```

### Servers
```js
const { Server } = require("basic-db");
let server = new Server("myDB");
server.set("foo", "bar"); // just like local storage but inside the server's storage and not the local one
var output = server.get("foo"); // returns the value of the key in the parameter from the server's storage
server.delete("foo"); // will delete the data stored in the "foo" key in the server's storage
```

### Hosting The Servers
```js
const { Server } = require("basic-db");
const { join } = require("path");
let server = new Server("passwords");
server.listenInserter(900, {
  key: "username",
  value: "password",
}, join(__dirname, "www.html"));
// will start a database insert server at port localhost:900
```
The server will insert the got data in the database using the `GET` method. The following HTML framework will insert data in the database.
```html
<form method="GET" action="http://localhost:900/">
  <h1>Create Account</h1>
  <label>Username:</label>
  <input type="text" name="username"/>
  <br>
  <label>Password:</label>
  <input type="password" name="password"/>
  <br>
  <input type="Submit" value="Create New Account"/>
</form>
```

**WARNING:** The form's method should always be `GET`.

Basic-DB also allows you to delete data from a server non-manually. The following framework will show you how it works
```js
const { Server } = require("basic-db");
const { join } = require("path")l
let server = new Server("myDB");
server.listenDeleter(900, "key", join(__dirname, "www.html"));
```
And the HTML Form should be:
```html
<form method="GET" action="http://localhost:900/">
  <h1>Delete Data From Basic-DB</h1>
  <label>Key:</label>
  <input type="text" name="key"/>
  <br>
  <input type="Submit" value="Delete"/>
</form>
```

**Installation Command:** `npm i basic-db` or `npm install basic-db`
