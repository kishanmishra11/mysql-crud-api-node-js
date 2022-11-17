const express = require('express');
const conn = require('../db/connection')
const router = express.Router();
const controller = require('../controller/productController')

router.post('/create',controller.createProduct)

router.post('/list',controller.listProduct)

router.post('/view/:id',controller.viewProduct)

router.post('/update/:id',controller.updateProduct)

router.post('/delete/:id',controller.deleteProduct)


module.exports = router;