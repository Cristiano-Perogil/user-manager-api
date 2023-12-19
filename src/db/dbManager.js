const sqlite3 = require('sqlite3').verbose();

/*
let query = `INSERT INTO users(name, age, city,  role, department_number)
             VALUES('Marina', 27, 'New York', 'SW Developer', 227111);`;

let createQuery = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, age INTEGER NOT NULL, city VARCHAR NOT NULL, role VARCHAR NOT NULL, department_number INTEGER NOT NULL);';
*/

function getUsersQuery(reqQuery = null) {
    let query = 'SELECT * FROM users';
    if (reqQuery) {
        if (reqQuery.method == 'id' || reqQuery.method == 'age' || reqQuery.method == 'department_number') {
            query += ` WHERE ${reqQuery.method} = ${reqQuery.keyWord};`;
        } else {
            query += ` WHERE ${reqQuery.method} = '${reqQuery.keyWord}';`;
        }
    } else { query += ';'; }
    return query;
}

function addUserQuery(reqBody) {
    let columns = 'INSERT INTO users(';
    let values = 'VALUES(';
    for (let key in reqBody) {
        columns += `${key.toString()}`;
        if (key.toString() == 'age' || key.toString() == 'department_number') {
            values += `${reqBody[key]}`;
        } else {
            values += `'${reqBody[key]}'`;
        }
        if (Object.keys(reqBody).length > 1 && key.toString() != Object.keys(reqBody)[Object.keys(reqBody).length - 1]) {
            columns += ', ';
            values += ', ';
        }
    }
    columns += ')';
    values += ');';
    let query = columns.concat(values);
    return query;
}

function deleteUserQuery(userId) {
    let query = `DELETE FROM users WHERE id = ${userId};`;
    return query;
}

function editUserQuery(userId, reqBody) {
    let query = 'UPDATE users SET ';
    for (let key in reqBody) {
        if (key.toString() == 'age' || key.toString() == 'department_number') {
            query += `${key.toString()} = ${reqBody[key]}`;
        } else {
            query += `${key.toString()} = '${reqBody[key].toLowerCase()}'`;
        }
        if (Object.keys(reqBody).length > 1 && key.toString() != Object.keys(reqBody)[Object.keys(reqBody).length - 1]) {
            query += ', ';
        }
    }
    query += ` WHERE id = ${userId};`;
    return query;
}

function runSQL(query, statement = '') {
    console.log('Running DB interaction\nSQL: ' + query);
    const dbInteraction = new Promise((resolve, reject) => {
        let response = {
            data: [],
            error: ''
        };

        const db = new sqlite3.Database('./src/db/database.db', (err) => {
            if (err) {
                console.error(err.message);
                response.error = err.message;
                reject(response);
            }
            console.log('Connected to the users database.');
        });

        if (statement == 'SELECT') {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    response.error = err.message;
                    reject(response);
                }

                response.data = rows;
                resolve(response);
            });
        } else if (statement == 'UPDATE' || statement == 'INSERT' || statement == 'DELETE') {
            db.run(query, (err) => {
                if (err) {
                    console.log(err.message);
                    response.error = err.message;
                    reject(response);
                } else {
                    response.data = 'Success!';
                    resolve(response);
                }
            });
        }

        // Closing the connection
        db.close((err) => {
            if (err) {
                console.error(err.message);
                response.error = err.message;
                reject(response);
            }
            console.log('Close the database connection.');
        });
    });
    return dbInteraction;
}

module.exports = {
    addUserQuery,
    deleteUserQuery,
    editUserQuery,
    getUsersQuery,
    runSQL
};
