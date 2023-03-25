const express = require("express");
const route = express.Router();
const db = require("../src/db/db.json")

route.get("/", (req, res) => {
    return res.send(db);
})

module.exports = route;