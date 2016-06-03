'use strict';

const Stock = require('../models/Stock');

function getAllStocksPromise() {
    const query = {
        display: true
    };
    return Stock.find(query).exec()
        .then(function(stocks) {
            //console.log(stocks);
            return stocks;
        });
}

module.exports = getAllStocksPromise;