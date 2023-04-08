const express = require("express");
const route = express.Router();
let { db } = require("../src/db/manageDb");

route.get("/", (req, res) => {
    return res.send(db());
})

// Filtering Users
route.get("/filterusers", (req, res) => {
    const filterMethod = req.query.filterBy;
    var filter;
    var queryResult;
    if (filterMethod == 'ID' || filterMethod == 'departmentNumber') {
        filter = Number(req.query.filter);
        queryResult = db().filter((items) => items[filterMethod] === filter);
    } else {
        filter = req.query.filter.toLowerCase();
        queryResult = db().filter((items) => items[filterMethod].toLowerCase() === filter);
    }
    if (queryResult.length == 0) {
        return res.status(404).json({ status: "User Not Found." })
    }
    return res.status(200).json(queryResult)
})

module.exports = route;