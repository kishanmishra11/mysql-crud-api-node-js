const express = require('express');
const conn = require('../db/connection')
const router = express.Router();
const controller = require('../controller/userController')

router.post('/add-user',controller.createUser)

router.post('/login-user',controller.loginUser)

module.exports = router;

