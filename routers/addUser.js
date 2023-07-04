const express = require("express");
const route = express.Router();
const validator = require("jsonschema").validate;
const schema = require("../src/schemas/dataSchema.json");
const { addUser } = require("../src/db/manageDb");

route.post("/", (req, res) => {
    const userDataValidation = validator(req.body, schema);

    if (!userDataValidation.valid) {
        let errorMSG = [];
        userDataValidation.errors.map((errors) => {
            errorMSG.push(errors.stack);
        })
        return res.status(422).json({ status: "Fail to add user", reason: "The request doesn't follows the pattern described in the doc", details: errorMSG });
    }

    // Trying to add the user to the database
    try {
        addUser(req.body);
        return res.status(200).json({ status: "Successfully added a user" });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ status: "an error didn't allow the user to be added to the database. Contact support for more information." });
    }
})

module.exports = route;