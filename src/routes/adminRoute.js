const express = require('express');
const conn = require('../db/connection')
const router = express.Router();
const controller = require('../controller/adminController')

router.post('/add-admin',controller.createAdmin)

router.post('/login-admin',controller.loginAdmin)

router.post('/add-user',controller.createUser)

router.post('/list-user',controller.listUser)

router.post('/view-user',controller.viewUser)

router.post('/delete-user',controller.deleteUser)

router.post('/edit-user',controller.editUser)


module.exports = router;