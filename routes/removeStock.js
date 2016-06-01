'use strict';

const utils = require('../lib/utils');
const removeStockPromise = require('./removeStockPromise');

function removeStock(req, res) {
    const userInputStock = req.body.stock;
    if (!userInputStock ||
        !utils.isString(userInputStock) ||
        !utils.isValidSymbol(userInputStock)) {
        return res.json({
            error: true,
            msg: 'Invalid request'
        });
    }
    
    removeStockPromise(userInputStock)
        .then(function(stock) {
            return res.json({msg: 'Removed stock'});
        })
        .catch(function(err) {
            console.log(err);
            res.json({error: true, msg: 'internal error'});
        });
}

module.exports = removeStock;