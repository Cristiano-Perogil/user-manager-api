const fs = require("fs");
const fileName = "./db.json";

let users = require(fileName);

// Adding User to the database
function addUser(data) {
    users.push({
        ID: (users[users.length - 1].ID + 1),
        ...data
    })
    try {
        saveFile(fileName, users);
    } catch (err) {
        throw new Error(err.message)
    }
}

// Editing a certain user from the database
function editUser(id, data) {
    let user = users.find((user) => user.ID === id);

    if (!user) {
        throw new Error("not found");
    }

    const updatedUser = {
        ...user,
        name: data.name,
        age: data.age,
        city: data.city,
        role: data.role,
        departmentNumber: data.departmentNumber
    }

    users = users.map((user) => {
        if (user.ID === id) {
            user = updatedUser;
        }
        return user
    })

    try {
        saveFile(fileName, users);
    } catch (error) {
        throw new Error(err.message);
    }
}

// Deleting a user present in the database
function deleteUser(id) {
    // Checking if the user has already been removed
    const checkPresentUser = users.find((user) => user.ID === id)

    if (!checkPresentUser) {
        throw new Error("not found")
    }

    users = users.filter((user) => user.ID !== id);

    try {
        saveFile(fileName, users);
    } catch (error) {
        throw new Error(error.message)
    }
}

// Saving changes to the database
function saveFile(fileName = '', data = {}) {
    fs.writeFile(`./src/db/${fileName}`, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            throw new Error("an error didn't allow the user to be added to the database. Contact support for more information.")
        }
    });


}

// Returning the users by storing them into a mutable variable
const db = () => {
    return users
}

module.exports = {
    addUser,
    editUser,
    deleteUser,
    db
}
