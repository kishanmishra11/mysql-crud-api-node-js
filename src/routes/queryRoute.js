const express = require('express');
const conn = require('../db/connection')
const router = express.Router();
const controller = require('../controller/queryController')

router.post('/inner-join',controller.innerJoin)

router.post('/left-join',controller.leftJoin)

router.post('/right-join',controller.rightJoin)

router.post('/full-join',controller.fullJoin)

router.post('/group-by',controller.groupBy)

router.post('/having',controller.having)

router.post('/exists',controller.exists)

router.post('/update-with-join/:id',controller.updateWithJoin)

router.post('/subquery',controller.subQuery)


module.exports = router;