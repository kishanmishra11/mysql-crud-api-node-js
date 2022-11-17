const express = require('express');
const conn = require('../db/connection')
const router = express.Router();
const controller = require('../controller/brandController')

router.post('/create',controller.createBrand)

router.post('/list',controller.listBrand)

router.post('/view/:id',controller.viewBrand)

router.post('/update/:id',controller.updateBrand)

router.post('/delete/:id',controller.deleteBrand)


module.exports = router;