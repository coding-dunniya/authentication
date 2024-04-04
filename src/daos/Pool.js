/**
 * Database connection pool module
 *
 * @format
 */

const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: 'coding-dunniya',
});

// export the connection pool to be used by other modules

module.exports = pool;
