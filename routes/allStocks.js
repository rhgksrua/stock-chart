'use strict';

const getAllStocksPromise = require('./getAllStocksPromise');

function allStocks(req, res) {
    getAllStocksPromise()
        .then(function(stocks) {
            return res.json(stocks);
        })
        .catch(function(err) {
            console.log(err);
            res.json({error: true, msg: 'internal error'});
        });
}

module.exports = allStocks;