'use strict';

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const Stock = require('../models/Stock');
const utils = require('../lib/utils');
const moment = require('moment');

function addStock(req, res) {
    const stockSymbol = req.body.stock.toUpperCase();
    
    // Validation
    if (!validSymbol(stockSymbol)) return res.json({error: true, msg: 'Invalid Symbol'});
    
    const query = Stock.findOne({'dataset_code': stockSymbol});
    const queryPromise = query.exec();
    queryPromise.then(function(stock) {
            // need to fetch new data if it does not exist
            if (!stock || outdatedData(stock.end_date)) {
                return fetchStockData(stockSymbol);
            }
            console.log('stock exists');
            //console.log(stock);
            return stock;
        })
        .then(function(stock) {
            if (stock.hasOwnProperty('error') && stock.error) return stock;
            return storeFetchedStockData(stock);
        })
        .then(function(stock) {
            return res.json(stock);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function fetchStockData(stockSymbol) {
    console.log('fetching ', stockSymbol);
    const url = utils.stockUrl(stockSymbol);
    const options = {
        
    };
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if (response.hasOwnProperty('quandl_error')) {
                return {
                    error: true,
                    msg: 'API error'
                };
            }
            //return storeFetchedStockData(response);
            return response.dataset;
        })
        
}

function storeFetchedStockData(data) {
    //const newStock = new Stock(data.dataset);
    //const stockPromise = newStock.save()
    //return stockPromise.then(function(stock) {
    //    return stock;
    //});
    //console.log('data store', data);
    console.log(data.dataset_code);
    const updateQuery = {
        'dataset_code': data.dataset_code
    };
    const updateData = {
        $set: data
    };
    const options = {
        upsert: true
    };
    const query = Stock.update(updateQuery, updateData, options);
    const stockPromise = query.exec();
    return stockPromise.then(function(stock) {
        return data;
    });
}

function validSymbol(stockSymbol) {
    return /^[a-zA-Z]{3,5}$/.test(stockSymbol);
}

function outdatedData(date) {
    const daysPast = 10;
    let compare = moment(date).add(daysPast, 'd').isBefore(moment());
    return compare;
}


module.exports = addStock;
