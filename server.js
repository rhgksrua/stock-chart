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

// Middleware to pass socket.io to routes
app.use(function(req, res, next) {
    res.io = io;
    next();
});

app.use('/api/v1', apiRoutes);
app.get('/', index);


function index(req, res) {
    return res.render('index');
}

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(port, function() {
    console.log('started server');
});

// SOCKET IO
console.log(process.env.NODE_ENV);

io.on('connection', function(socket) {
    socket.on('add stock', function(data) {
        console.log('attempting to add stock...');
    });
    socket.on('remove stock', function(data) {
        console.log('attempting to remove stock...')
    })
});

module.exports = app;