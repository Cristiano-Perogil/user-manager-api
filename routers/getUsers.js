const express = require("express");
const route = express.Router();
const { runSQL, getUsersQuery } = require('../src/db/dbManager');

route.get("/", async (req, res) => {
    if (Object.keys(req.query).length === 0 && req.body.constructor === Object) {
        query = getUsersQuery();
    } else {
        console.log(`Filtering users by ${JSON.stringify(req.query)}\nPlease wait...`);
        query = getUsersQuery(req.query);
    }

    await runSQL(query, 'SELECT').then((data) => {
        if (data.data.length == 0) {
            res.status(404).json({ status: 'FAILED', reason: 'No users were found.' });
        } else { res.send(data.data); }
    }).catch((err) => {
        res.status(400).json({ status: 'FAILED', reason: err.error })
    })
});
module.exports = route;
