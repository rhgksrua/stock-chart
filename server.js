var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Routes
var apiRoutes = require('./routes/apiVersion1');

require('dotenv').config({silent: true});

var app = express();

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = process.env.PORT || 3000;

var MONGO_URI = process.env.MONGODB_URI ||
                process.env.MONGO_URI ||
                process.env.IP + '/nightlife';
                
app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/build'));

app.use('/api/v1', apiRoutes);

app.get('/', index);

/**
 * HOME
 **/
function index(req, res) {
    return res.render('index');
}

app.listen(port, function() {
    console.log('started server');
});

module.exports = app;