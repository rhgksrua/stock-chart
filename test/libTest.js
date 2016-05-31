'use strict';

const expect = require('chai').expect;
const utils = require('../lib/utils');

describe('lib tests', () => {
    it('should return api url', () => {
        const fileName = 'goog.json';
        const stockUrl = utils.stockUrl(fileName);
        expect(stockUrl).to.equal(`https://www.quandl.com/api/v3/datasets/WIKI/goog.json?api_key=${process.env.STOCK_API_KEY}`);
    });
});