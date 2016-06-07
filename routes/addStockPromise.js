'use strict';

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const Stock = require('../models/Stock');
const utils = require('../lib/utils');
const moment = require('moment');

function addStockPromise(stockSymbol) {
    
    stockSymbol = stockSymbol.toUpperCase();
    const query = Stock.findOne({'dataset_code': stockSymbol});
    const queryPromise = query.exec();
    return queryPromise.then(function(stock) {
        
            // If stock is not found, fetches stock from api
            if (!stock || outdatedData(stock.end_date)) {
                console.log('Fetching from api...');
                return fetchStockData(stockSymbol);
            }
            console.log('stock exists... retrieved from db');
            stock.display = true;
            console.log(stock);
            return stock.save();
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
                console.log(response.quandl_error);
                throw new Error(response.quandl_error);
            }
            return storeFetchedStockData(response.dataset);
        });
        
}

function storeFetchedStockData(data) {
    console.log(data.dataset_code);
    data.display = true;
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

function outdatedData(date) {
    const daysPast = 10;
    let compare = moment(date).add(daysPast, 'd').isBefore(moment());
    return compare;
}

module.exports = addStockPromise;