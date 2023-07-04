const sqlite3 = require('sqlite3').verbose();

let query = `INSERT INTO users(name, age, city,  role, department_number)
             VALUES('Marina', 27, 'New York', 'SW Developer', 227111);`;

let createQuery = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, age INTEGER NOT NULL, city VARCHAR NOT NULL, role VARCHAR NOT NULL, department_number INTEGER NOT NULL);';

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
    runSQL,
    getUsersQuery
};
