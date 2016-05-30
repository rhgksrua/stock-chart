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
    it('response status 200', function(done) {
        request(app)
            .del('/api/v1/remove')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('Add stock PUT /api/v1/add', function() {
    it('response status 200', function(done) {
        request(app)
            .put('/api/v1/add')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
    
});