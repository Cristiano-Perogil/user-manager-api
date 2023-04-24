const express = require("express");
const route = express.Router();
<<<<<<< HEAD
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
=======
const {db} = require("../src/db/manageDb")

route.get("/", (req, res) => {
    return res.send(db());
>>>>>>> 0b6a6560a66c5b006846e95bf07b9c5f35d042cc
})


// Filtering users
route.get("/filterusers", (req,res)=> {
    let method = req.query.filterBy;
    let keyWord;
    let filter = [];
    if (method == 'ID' || method == 'departmentNumber') {
        keyWord = req.query.keyWord;
        filter = db().filter((users)=> users[method]== keyWord);
    }else {
        keyWord = req.query.keyWord.toLowerCase();
        console.log(method, keyWord);
        filter = db().filter((user)=> user[method].toLowerCase() == keyWord);
    }
    
    // Checking if the filter operation returns any result
    if (filter.length !=0) {
        return res.status(200).json(filter);
    }else {
        return res.status(404).json({status: "Not Found", message: "it was not possible to find a user with the filters provided!"})
    }
        
});

module.exports = route;