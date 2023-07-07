const express = require("express");
const route = express.Router();
const validator = require("jsonschema").validate;
const schema = require("../src/schemas/dataSchema.json");
const { addUserQuery, runSQL } = require('../src/db/dbManager');

route.post("/", async (req, res) => {
    const userDataValidation = validator(req.body, schema);

    if (!userDataValidation.valid) {
        let errorMSG = [];
        userDataValidation.errors.map((errors) => {
            errorMSG.push(errors.stack);
        })
        return res.status(422).json({ status: "Fail to add user", reason: "The request doesn't follows the pattern described in the doc", details: errorMSG });
    }

    let query = addUserQuery(req.body);

    await runSQL(query, 'INSERT').then((response) => {
        return res.status(200).json({ status: 'success!' })
    }).catch((err) => {
        return res.status(400).json({ status: 'FAILED', reason: err.error });
    })
})

module.exports = route;
