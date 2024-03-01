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

// a users array to save user records
const users = [];

// save a user
// user --> The user object to save
// callback --> callback to call after completion
const save = function (user, callback) {
    // generate a unique user id
    const userId = uuid.v4();
    const copied = _.clone(user);
    copied.id = userId;
    users.push(copied);
    callback(null, copied);
};

// find a user by given id
// id --> The user id
// callback --> Callback function to call after completion
const findById = function (id, callback) {
    // loop over array
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return callback(null, _.clone(users[i]));
        }
    }
    // if user not found
    callback(null, null);
};

// find a user by given email
// email --> The user email
// callback --> Callback function to call after completion
const findByEmail = function (email, callback) {
    // loop over array
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return callback(null, _.clone(users[i]));
        }
    }
    // if user not found
    callback(null, null);
};

module.exports = {
    save,
    findByEmail,
    findById,
};
