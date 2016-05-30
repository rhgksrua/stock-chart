var express = require('express');
var router = express.Router();

router.put('/add', function(req, res) {
    res.json({stock: 'new stock'});
});

router.delete('/remove', function(req, res) {
    res.json({status: 'deleted stock'});
});

module.exports = router;