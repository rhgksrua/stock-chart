'use strict';

const utils = require('../lib/utils');
const addStockPromise = require('./addStockPromise');

function addStock(req, res) {
    const userInputStock = req.body.stockSymbol;
    if (!userInputStock ||
        !utils.isString(userInputStock) ||
        !utils.isValidSymbol(userInputStock)) {
        return res.json({
            error: true,
            msg: 'Invalid request. User input error'
        });
    }
    
    addStockPromise(userInputStock)
        .then(function(stock) {
            console.log('--- start date', stock.start_date);
            console.log('--- end date', stock.end_date);
            res.io.emit('add stock', { stock });
            return stock;
        })
        .then(function(stock) {
            console.log(stock.display);
            return res.json(stock);
        })
        .catch(function(err) {
            console.log('-- add error', err);
            res.json({error: true, msg: 'internal error'});
        });
        
}

module.exports = addStock;
