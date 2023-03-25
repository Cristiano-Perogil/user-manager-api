const express = require("express");
const route = express.Router();
const { deleteUser } = require("../src/db/manageDb");

route.delete("/:id", (req, res) => {
    // Trying to remove a user from the database
    try {
        deleteUser(Number(req.params.id));
        return res.status(200).json({ status: "Successfully deleted a user" });
    } catch (err) {
        console.log(err)
        if (err.message === "not found") {
            return res.status(404).json({ status: "Faile to delete user", reason: "User not found." });
        }
        return res.status(500).json({ status: "an error didn't allow the user to be deleted from the database. Contact support for more information." });
    }
})

module.exports = route;