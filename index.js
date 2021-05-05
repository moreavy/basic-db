const fs = require("fs");
const { EOL } = require("os");
const { join } = require("path");
const express = require("express");

const local = new class {
    set(key, value) {
        var storage = require(join(__dirname, "storage.json"));
        storage.local[key] = value;
        fs.writeFileSync(join(__dirname, "storage.json"), `${JSON.stringify(storage)}${EOL}`, {
            encoding: "utf-8",
        });
    }

    get(key) {
        var storage = require(join(__dirname, "storage.json"));
        return storage.local[key]
    }

    delete(key) {
        var storage = require(join(__dirname, "storage.json"));
        delete storage.local[key];
        fs.writeFileSync(join(__dirname, "storage.json"), `${JSON.stringify(storage)}${EOL}`, {
            encoding: "utf-8",
        });
    }
}();

class Server {
    constructor(name) {
        this.name = name;
        var storage = require(join(__dirname, "storage.json"));
        if (!storage.servers[this.name]) {
            storage.servers[this.name] = {};
            fs.writeFileSync(join(__dirname, "storage.json"), `${JSON.stringify(storage)}${EOL}`, {
                encoding: "utf-8",
            });
        }
    }

    set(key, value) {
        var name = this.name;
        var storage = require(join(__dirname, "storage.json"));
        storage.servers[name][key] = value;
        fs.writeFileSync(join(__dirname, "storage.json"), `${JSON.stringify(storage)}${EOL}`, {
            encoding: "utf-8",
        });
    }

    get(key) {
        var storage = require(join(__dirname, "storage.json"));
        return storage.servers[this.name][key];
    }

    delete(key) {
        var storage = require(join(__dirname, "storage.json"));
        delete storage.servers[this.name][key];
        fs.writeFileSync(join(__dirname, "storage.json"), `${JSON.stringify(storage)}${EOL}`, {
            encoding: "utf-8",
        });
    }

    exportAll() {
        var storage = require(join(__dirname, "storage.json"));
        return storage.servers[this.name];
    }

    listenInserter(port, { key, value }, forwardPath) {
        let app = express();
        app.get("/", (req, res) => {
            const k = req.query[key];
            const v = req.query[value];
            this.set(k, v);
            res.sendFile(forwardPath);
        });
        app.listen(port);
    }

    listenDeleter(port, key, forwardPath) {
        let app = express();
        app.get("/", (req, res) => {
            const k = req.query[key];
            this.delete(k);
            res.sendFile(forwardPath);
        });
        app.listen(port);
    }
}

module.exports = { local, Server };
