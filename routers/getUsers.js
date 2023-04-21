const express = require("express");
const route = express.Router();
const {db} = require("../src/db/manageDb")

route.get("/", (req, res) => {
    return res.send(db());
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