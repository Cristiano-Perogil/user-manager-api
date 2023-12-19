const express = require('express');
const route = express.Router();
const { deleteUserQuery, runSQL } = require('../src/db/dbManager');

route.delete('/:id', async (req, res) => {
    let query = deleteUserQuery(Number(req.params.id));

    await runSQL(query, 'DELETE').then(() => {
        return res.status(200).json({ status: 'success!' });
    }).catch((err) => {
        if (err.error == 'NOT FOUND') {
            return res.status(404).json({ status: 'FAILED', reason: err.error });
        } else {
            return res.status(400).json({ status: 'FAILED', reason: err.error });
        }
    });
});

module.exports = route;
