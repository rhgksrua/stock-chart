'use strict';

const STOCK_API_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/';

const stockUrl = (name) => {
    const apiUrl = process.env.STOCK_URL;
    const apiKey = process.env.STOCK_API_KEY;
    return `${STOCK_API_URL}${name}?api_key=${apiKey}`;
};


module.exports = {
    stockUrl
};