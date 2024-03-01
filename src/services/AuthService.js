/**
 * Application logic
 * This service exposes apis to handle user registration and authentication
 *
 * @format
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require('../daos/Users');
const errors = require('errors');
const _ = require('lodash');

// check login credentials and generate jwt token
// body --> the request body
// callback --> callback function to call after completion
const login = function (body, callback) {
    // first find the existing user
    userDao.findByEmail(body.email, (err, existingUser) => {
        if (err) {
            return callback(err);
        } else if (!existingUser) {
            // throw user not found error
            const uerr = new errors.HttpError({ message: 'user not found with specified email', status: 404 });
            return callback(uerr);
        }
        // match password
        const result = bcrypt.compareSync(body.password, existingUser.password);
        if (!result) {
            // if password verification failed
            const perr = new errors.HttpError({ message: 'incorrect password', status: 404 });
            return callback(perr);
        }
        // password is correct generate jwt token
        // expires in is in seconds
        const token = jwt.sign({ userId: existingUser.id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
        callback(null, { accessToken: token });
    });
};

// register a user, email should be unique accross the system
// content --> The user registration details
// callback --> callback function to call after completion
const register = function (content, callback) {
    // first find out if there are users with given email
    userDao.findByEmail(content.email, (err, existingUser) => {
        if (err) {
            return callback(err);
        } else if (existingUser) {
            const uerr = new errors.HttpError({ message: 'Email already registered', status: 400 });
            return callback(uerr);
        }
        // hash password
        const hashedPassword = bcrypt.hashSync(content.password, 10);
        content.password = hashedPassword;
        userDao.save(content, (serr, newUser) => {
            if (serr) {
                return callback(serr);
            }
            const picked = _.pick(newUser, ['id', 'name', 'email']);
            callback(null, picked);
        });
    });
};

// fetch user profile for given user id
const fetchUserProfile = function (userId, callback) {
    userDao.findById(userId, (err, user) => {
        if (err) {
            return callback(err);
        } else if (!user) {
            // if user doesn't exist
            const uerr = new errors.HttpError({ message: 'user not found', status: 404 });
            return callback(uerr);
        }
        const picked = _.pick(user, ['id', 'name', 'email']);
        callback(null, picked);
    });
};

module.exports = {
    register,
    login,
    fetchUserProfile,
};
