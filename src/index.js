/**
 * Main entry point of the application
 *
 * @format
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use('/users', controllers);

const errorMiddleware = require('./middlewares/ErrorMiddleware');

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log('Application is ready to serve requests');
});
