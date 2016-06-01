'use strict';

const express = require('express');
const router = express.Router();
const addStock = require('./addStock');
const removeStock = require('./removeStock');

router.put('/add', addStock);

router.delete('/remove', removeStock);

module.exports = router;