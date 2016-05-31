'use strict';

var request = require('supertest');

var app = require('../server.js');

describe('GET /', function() {
    it('resonds status 200', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('Remove stock DELETE /api/v1/remove', function() {
    it('does nothing yet', function(done) {
        request(app)
            .del('/api/v1/remove')
            .send({stock: 'a'})
            .expect('Content-Type', /json/)
            .expect(200, {
                status: 'deleted stock'
            })
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
        
        
        
    })
});

describe('Add stock PUT /api/v1/add', function() {
    it('should respond with status 200', function(done) {
        request(app)
            .put('/api/v1/add')
            .send({stock: 'goog'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
    it('should respond with error for too short symbol', function(done) {
        request(app)
            .put('/api/v1/add')
            .send({stock: 'aa'})
            .expect('Content-Type', /json/)
            .expect(200, {
                error: true,
                msg: 'Invalid Symbol'
            })
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
    it('should respond with API error with invalid symbol', function(done) {
        request(app)
            .put('/api/v1/add')
            .send({stock: 'yyyy'})
            .expect('Content-Type', /json/)
            .expect(200, {
                error: true,
                msg: 'API error'
            })
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
        
    })
    
});