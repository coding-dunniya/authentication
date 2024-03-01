/**
 * Simple middleware to catch errors and return json response to clients
 *
 * @format
 */

function errorHadler(err, req, res, next) {
    const message = err.message || 'Something went wrong, please try again';
    const status = err.status || 500;

    return res.status(status).json({ error: true, message: message });
}

module.exports = errorHadler;
