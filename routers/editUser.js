const express = require("express");
const route = express.Router();
const validator = require("jsonschema").validate;
const schema = require("../src/schemas/dataSchema.json");
const { editUser } = require("../src/db/manageDb");

route.put("/:id", (req, res) => {
    const userDataValidation = validator(req.body, schema);

    if (!userDataValidation.valid) {
        let errorMSG = [];
        userDataValidation.errors.map((errors) => {
            errorMSG.push(errors.stack);
        })
        return res.status(422).json({ status: "Fail to add user", reason: "The request doesn't follows the pattern described in the doc", details: errorMSG });
    }

    // Trying to edit a user from the database
    try {
        editUser(Number(req.params.id), req.body);
        return res.status(200).json({ status: "Successfully updated a user" });
    } catch (err) {
        console.log(err.message)
        if (err.message === "not found") {
            return res.status(404).json({ status: "Faile to edit user", reason: "User not found." });
        }
        return res.status(500).json({ status: "an error didn't allow the user to be added to the database. Contact support for more information." });
    }
})

module.exports = route;