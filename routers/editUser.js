const express = require("express");
const route = express.Router();
const validator = require("jsonschema").validate;
const schema = require("../src/schemas/dataSchema.json");
const { runSQL, editUserQuery } = require('../src/db/dbManager');

route.put("/:id", async (req, res) => {
    const userDataValidation = validator(req.body, schema);

    if (!userDataValidation.valid) {
        let errorMSG = [];
        userDataValidation.errors.map((errors) => {
            errorMSG.push(errors.stack);
            console.log(errorMSG)
        })
        return res.status(422).json({ status: "Fail to add user", reason: "The request doesn't follows the pattern described in the doc", details: errorMSG });
    }

    // Inserting a user into the database
    const query = editUserQuery(Number(req.params.id), req.body);

    await runSQL(query, 'UPDATE').then((response) => {
        return res.status(200).json({ status: 'SUCCESS', message: response.data })
    }).catch((err) => {
        return res.status(400).json({ status: 'FAILED', reason: err.error });
    })
})

module.exports = route;
