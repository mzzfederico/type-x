const path = require("path");
const fs = require("fs");
const express = require('express');
const app = express();
const port = 3000;

console.log(path.resolve(__dirname, "client", "static", "index.html"));

const htmlWrapper = fs.readFileSync(path.resolve(__dirname, "client", "static", "index.html"), "utf8");

app.get('/', (req, res) => res.send(`${htmlWrapper}`));

app.use(express.static(__dirname + '/client/static'));
app.use(express.static(__dirname + '/client/dist'));

app.listen(port, () => console.log("listening on " + port));