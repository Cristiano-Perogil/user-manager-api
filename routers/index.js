const getusersRoute = require("./getUsers");
const adduserRoute = require("./addUser");
const editusersRoute = require("./editUser")
const deleteuserRoute = require("./deleteUser")

function includeRoutes(app) {
    app.use('/getusers', getusersRoute);
    app.use('/adduser', adduserRoute);
    app.use('/edituser', editusersRoute);
    app.use('/deleteuser', deleteuserRoute);
}

module.exports = includeRoutes;