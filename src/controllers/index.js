/**
 * entry point for controllers
 * Export controller logic
 *
 * @format
 */

const express = require('express');
const AuthMiddleware = require('./AuthMiddleware');

const router = express.Router();

const AuthController = require('./AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me/profile', AuthMiddleware, AuthController.profile);

module.exports = router;
