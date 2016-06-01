'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = new Schema({
    id: String,
    dataset_code: String,
    name: String,
    start_date: Date,
    end_date: Date,
    column_names: [ String ],
    data: [ String ],
    display: { type: Boolean, default: true }
});


module.exports = mongoose.model('Stock', Stock);