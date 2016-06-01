'use strict';

const utils = require('../lib/utils');
const addStockPromise = require('./addStockPromise');

function addStock(req, res) {
    const userInputStock = req.body.stock;
    if (!userInputStock ||
        !utils.isString(userInputStock) ||
        !utils.isValidSymbol(userInputStock)) {
        return res.json({
            error: true,
            msg: 'Invalid request'
        });
    }
    
    addStockPromise(userInputStock)
        .then(function(stock) {
            console.log(stock.display);
            return res.json(stock);
        })
        .catch(function(err) {
            console.log(err);
            res.json({error: true, msg: 'internal error'});
        });
        
}

module.exports = addStock;
