var assert = require('assert');
var User = require('../lib/users');
var pool = require('../lib/pool');

describe('user', function() {
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
        conn.query('insert into users (id, name, note) values(?, ?, ?)', [
            user.id, user.name, user.note], function(err, results) {
          conn.end();
        });
      });
    });
  });
  describe('#create', function() {
    it('should success when insert user', function(done) {
      var user = new User();
      user.name = 'name-test';
      user.note = 'note-test';
      user.create(function(err, results) {
        if (err)
          return done(err);
        assert.equal(1, results.affectedRows);
        done();
      });
    });
  });
  describe('#update', function() {
    it('should success when update user', function(done) {
      var user = new User();
      user.id = 1;
      user.name = 'name-updated';
      user.note = 'note-updated';
      user.update(function(err, results) {
        if (err)
          return done(err);
        assert.equal(1, results.affectedRows);
        done();
      });
    });
  });
  describe('#get', function() {
    it('should success when get user', function(done) {
      var user = new User();
      user.id = 2;
      user.get(function(err, rows) {
        if (err)
          return done(err);
        assert.equal(1, rows.length);
        assert.equal(2, rows[0].id);
        assert.equal('name02', rows[0].name);
        assert.equal('note02', rows[0].note);
        done();
      });
    });
  });
  describe('#delete', function() {
    it('should success when delete user', function(done) {
      var user = new User();
      user.id = 3;
      user.delete(function(err, results) {
        if (err)
          return done(err);
        assert.equal(1, results.affectedRows);
        done();
      });
    });
  });
  describe('#list', function() {
    it('should success when list user', function(done) {
      var user = new User();
      user.list(function(err, rows) {
        if (err)
          return done(err);
        assert.equal(6, rows.length)
        done();
      });
    });
  });
  describe('#find', function() {
    it('should success when query user', function(done) {
      var user = new User();
      user.name = 'name';
      user.find(function(err, rows) {
        if (err)
          return done(err);
        assert.equal(3, rows.length)
        done();
      });
    });
  });
});