const express = require("express");
const route = express.Router();
const db = require("../src/db/db.json");

route.get("/", (req, res) => {
    return res.send(db);
})

// Filtering Users
route.get("/filterusers", (req, res) => {
    const filterMethod = req.query.filterBy;
    const filter = req.query.filter.toLowerCase();
    const queryResult = db.filter((items) => items[filterMethod].toLowerCase() === filter);
    if (!queryResult) {
        return res.status(404).json({ status: "User Not Found." })
    }
    return res.status(200).json(queryResult)
})

module.exports = route;