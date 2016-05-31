'use strict';

const express = require('express');
const router = express.Router();
const addStock = require('./addStock');

router.put('/add', addStock);

router.delete('/remove', function(req, res) {
    res.json({status: 'deleted stock'});
});

module.exports = router;