'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Routes
const apiRoutes = require('./routes/apiVersion1');

require('dotenv').config({silent: true});

const app = express();

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGODB_URI ||
                process.env.MONGO_URI ||
                process.env.IP + '/stocks';
                
mongoose.connect(MONGO_URI);

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/build'));

app.use('/api/v1', apiRoutes);
app.get('/', index);

function index(req, res) {
    return res.render('index');
}

app.listen(port, function() {
    console.log('started server');
});

module.exports = app;