const express = require("express");
const route = express.Router();
const { runSQL, getUsersQuery } = require('../src/db/dbManager');

route.get("/", (req, res) => {
    if (Object.keys(req.query).length === 0 && req.body.constructor === Object) {
        query = getUsersQuery();
    } else {
        console.log(`Filtering users by ${JSON.stringify(req.query)}\nPlease wait...`);
        query = getUsersQuery(req.query);
    }

    runSQL(query, 'SELECT').then((data) => {
        if (data.data.length == 0) {
            res.status(404).json({ status: 'FAILED', reason: 'No users were found.' });
        }
        res.send(data.data);
    }).catch((err) => {
        res.status(400).json({ status: 'FAILED', reason: err.error })
    })
});

// Filtering users
route.get("/filterusers", (req, res) => {
    let method = req.query.filterBy;
    let keyWord;
    let filter = [];
    if (method == 'ID' || method == 'departmentNumber') {
        keyWord = req.query.keyWord;
        filter = db().filter((users) => users[method] == keyWord);
    } else {
        keyWord = req.query.keyWord.toLowerCase();
        filter = db().filter((user) => user[method].toLowerCase() == keyWord);
    }

    // Checking if the filter operation returns any result
    if (filter.length != 0) {
        return res.status(200).json(filter);
    } else {
        return res.status(404).json({ status: "Not Found", message: "it was not possible to find a user with the filters provided!" })
    }
});

module.exports = route;
