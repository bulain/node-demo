var app = require('../app');
var request = require('supertest');
var pool = require('../lib/pool');

describe('User API', function() {
  before(function() {
    var users = [{
      id : 1,
      name : 'name01',
      note : 'note01'
    }, {
      id : 2,
      name : 'name02',
      note : 'note02'
    }, {
      id : 3,
      name : 'name03',
      note : 'note03'
    }, {
      id : 4,
      name : 'name',
      note : 'note04'
    }, {
      id : 5,
      name : 'name',
      note : 'note05'
    }, {
      id : 6,
      name : 'name',
      note : 'note06'
    }];
    pool.getConnection(function(err, conn) {
      conn.query('delete from users');
    });
    users.forEach(function(user) {
      pool.getConnection(function(err, conn) {
        conn.query('insert into users (id, name, note) values(?, ?, ?)', [user.id, user.name, user.note], function(err,
            results) {
          conn.end();
        });
      });
    });
  });
  describe('GET', function() {
    it('/user should return 200', function(done) {
      request(app).get('/user').expect(200, done);
    });
    it('/user/new should return 200', function(done) {
      request(app).get('/user/new').expect(200, done);
    });
    it('/user/1 should return 200', function(done) {
      request(app).get('/user/1').expect(200, done);
    });
  });
  describe('PUT', function() {
    it('/user should return 302', function(done) {
      request(app).put('/user').send({
        user : {
          name : 'name-put',
          note : 'note-put'
        }
      }).expect(302, done);
    });
  });
  describe('POST', function() {
    it('/user/1 should return 302', function(done) {
      request(app).post('/user/1').send({
        user : {
          name : 'name-post',
          note : 'note-post'
        }
      }).expect(302, done);
    });
  });
  describe('DELETE', function() {
    it('/user/2 should return 302', function(done) {
      request(app).del('/user/2').expect(302, done);
    });
  });
});