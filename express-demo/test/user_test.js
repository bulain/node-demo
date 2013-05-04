var assert = require('assert');
var User = require('../lib/user');

describe('user', function() {
  describe('#create', function() {
    it('should success when insert user', function(done) {
      var user = new User();
      user.name = 'name';
      user.note = 'note';
      user.create(done);
    });
  });
  describe('#update', function() {
    it('should success when update user', function(done) {
      var user = new User();
      user.id = 1;
      user.name = 'name01';
      user.note = 'note01';
      user.update(done);
    });
  });
  describe('#get', function() {
    it('should success when get user', function(done) {
      var user = new User();
      user.id = 1;
      user.get(done);
    });
  });
  describe('#destory', function() {
    it('should success when delete user', function(done) {
      var user = new User();
      user.id = 1;
      user.destory(done);
    });
  });
  describe('#query', function() {
    it('should success when query user', function(done) {
      var user = new User();
      user.name = 'name';
      user.query(done);
    });
  });
});