/**
 * A data access object to manage user entities
 * This module is used to save or query user entities in persistent storage
 * this module has following type of functions
 * 1. save the user
 * 2. fetch user based on the user id
 * 3. fetch user based on the user email
 *
 * For now we are not saving in database, we are saving user records in memory
 *
 * @format
 */

const _ = require('lodash');
const uuid = require('uuid');

// save the data in database, import connection pool and start sending queries to database

const pool = require('./Pool');

// save a user
// user --> The user object to save
// callback --> callback to call after completion
const save = function (user, callback) {
    // generate a unique user id
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    pool.query({ text: insertQuery, values: [user.name, user.email, user.password] })
        .then(res => {
            const row = res.rows[0];
            const cloned = { id: row.id, name: row.name, email: row.email, password: row.password };
            callback(null, cloned);
        })
        .catch(err => callback(err, null));
};

// find a user by given id
// id --> The user id
// callback --> Callback function to call after completion
const findById = function (id, callback) {
    const selectQuery = 'SELECT * from users where id = $1';
    pool.query({ text: selectQuery, values: [id] })
        .then(res => {
            if (res.rowCount === 0) {
                // if user is not found
                return callback(null, null);
            }
            const row = res.rows[0];
            const user = { id: id, name: row.name, email: row.email, password: row.password };
            callback(null, user);
        })
        .catch(err => callback(err, null));
};

// find a user by given email
// email --> The user email
// callback --> Callback function to call after completion
const findByEmail = function (email, callback) {
    const selectQuery = 'SELECT * from users where email = $1';
    pool.query({ text: selectQuery, values: [email] })
        .then(res => {
            if (res.rowCount === 0) {
                // if user is not found
                return callback(null, null);
            }
            const row = res.rows[0];
            const user = { id: row.id, name: row.name, email: email, password: row.password };
            callback(null, user);
        })
        .catch(err => callback(err, null));
};

module.exports = {
    save,
    findByEmail,
    findById,
};
