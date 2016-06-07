'use strict';

const STOCK_API_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/';

const stockUrl = (name) => {
    const apiUrl = process.env.STOCK_URL;
    const apiKey = process.env.STOCK_API_KEY;
    return `${STOCK_API_URL}${name}?api_key=${apiKey}&start_date=2015-05-01`;
};

const isString = (str) => {
    return Object.prototype.toString.call(str) === '[object String]';
}

const isValidSymbol = (sym) => {
    return /^[a-zA-Z]{2,5}$/.test(sym);
}


module.exports = {
    stockUrl,
    isString,
    isValidSymbol
};