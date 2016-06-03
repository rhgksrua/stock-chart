'use strict';

const utils = require('../lib/utils');
const removeStockPromise = require('./removeStockPromise');

function removeStock(req, res) {
    const userInputStock = req.body.stockSymbol;
    if (!userInputStock ||
        !utils.isString(userInputStock) ||
        !utils.isValidSymbol(userInputStock)) {
        return res.json({
            error: true,
            msg: 'Invalid request'
        });
    }
    
    removeStockPromise(userInputStock)
        .then(function(stockSymbol) {
            console.log('--- stock symbol to remove', stockSymbol);
            return stockSymbol;
        })
        .then(function(stockSymbol) {
            //console.log('io', res.io);
            res.io.emit('remove stock', { stockSymbol });
            //res.io.sockets.broadcast.emit('remove stock', { stockSymbol });
            return res.json({msg: 'Removed stock'});
        })
        .catch(function(err) {
            console.log(err);
            res.json({error: true, msg: 'internal error'});
        });
}

module.exports = removeStock;