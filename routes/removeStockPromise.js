'use strict';

const Stock = require('../models/Stock');
//const utils = require('../lib/utils');

function removeStockPromise(stockSymbol) {
    stockSymbol = stockSymbol.toUpperCase();
    const updateQuery = {
        'dataset_code': stockSymbol
    };
    const updateData = {
        $set: {
            display: false
        }
    };
    const options = {
        
    };
    return Stock.update(updateQuery, updateData, options).exec()
        .then(function(writeResult) {
            if (writeResult.nModified > 0) {
                return {
                    msg: 'Removed stock'
                };
            }
            throw new Error('Stock does not exist');
        });
}

module.exports = removeStockPromise;