/**
 * Authentication controller
 * To handle http requests for auth endpoints
 *
 * @format
 */

const _ = require('lodash');
const errors = require('errors');
const authService = require('../services/AuthService');

// handle register http request
// req --> The request object
// res --> The response object
// next --> The next middleware
const register = function (req, res, next) {
    const requestBody = req.body;
    if (_.isEmpty(requestBody.email) || _.isEmpty(requestBody.name) || _.isEmpty(requestBody.password)) {
        const err = new errors.HttpError({ message: 'Invalid or missing parameters', status: 400 });
        return next(err);
    }
    authService.register(requestBody, (err, user) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(user);
    });
};

// handle login http request
// req --> the request wrapper
// res --> the http response wrapper
// next --> the next function to continue the execution chain
const login = function (req, res, next) {
    const requestBody = req.body;
    if (_.isEmpty(requestBody.email) || _.isEmpty(requestBody.password)) {
        const err = new errors.HttpError({ message: 'Invalid or missing parameters', status: 400 });
        return next(err);
    }
    authService.login(requestBody, (err, token) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(token);
    });
};

// handle get profile http request
// req --> the request wrapper
// res --> the http response wrapper
// next --> the next function to continue the execution chain
const profile = function (req, res, next) {
    const userId = req.tokenPayload.userId;
    authService.fetchUserProfile(userId, (err, data) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(data);
    });
};

module.exports = {
    register,
    login,
    profile,
};
