'use strict';

const express = require('express');
const router = express.Router();
const addStock = require('./addStock');
const removeStock = require('./removeStock');
const allStocks = require('./allStocks');

router.put('/add', addStock);

router.delete('/remove', removeStock);

router.get('/all', allStocks);

module.exports = router;