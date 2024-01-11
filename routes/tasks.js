const express = require('express')
const router = express.Router()

const {
  getBalance,
} = require('../controllers/tasks')

router.route('/getBalance').get(getBalance)

module.exports = router
