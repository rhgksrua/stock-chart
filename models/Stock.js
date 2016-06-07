'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = new Schema({
    id: String,
    dataset_code: String,
    name: String,
    start_date: String,
    end_date: String,
    column_names: [ String ],
    data: [ Schema.Types.Mixed ],
    display: { type: Boolean, default: true }
});



module.exports = mongoose.model('Stock', Stock);