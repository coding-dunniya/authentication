/**
 * Authentication middleware to validate access token
 *
 * @format
 */

const _ = require('lodash');
const errors = require('errors');
const jwt = require('jsonwebtoken');

const middleware = function (req, res, next) {
    const authHeader = req.get('Authorization');
    if (_.isEmpty(authHeader)) {
        const err = new errors.Http401Error({ message: 'Authorization header not present', status: 401 });
        return next(err);
    }
    const split = authHeader.split(' ');
    if (split.length != 2 || split[0] !== 'Bearer') {
        const err = new errors.Http401Error({ message: 'Invalid Authorization header format', status: 401 });
        return next(err);
    }
    try {
        const payload = jwt.verify(split[1], process.env.SECRET_KEY);
        req.tokenPayload = payload;
        next();
    } catch (err) {
        return next(new errors.Http401Error({ message: 'invalid jwt token', status: 401 }));
    }
};

module.exports = middleware;
