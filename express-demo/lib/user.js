var pool = require('./pool');

var User = function() {
}

User.prototype.create = function(callback) {
  var user = {
    name : this.name,
    note : this.note
  };
  pool.getConnection(function(err, connection) {
    connection.query('insert into users (name, note) values(?, ?)', [user.name,
        user.note], callback);
  });
}
User.prototype.update = function(callback) {
  var user = {
    id : this.id,
    name : this.name,
    note : this.note
  };
  pool.getConnection(function(err, connection) {
    connection.query('update users set name=?, note=? where id=?', [user.name,
        user.note, user.id], callback);
  });
}
User.prototype.get = function(callback) {
  var user = {
    id : this.id
  };
  pool.getConnection(function(err, connection) {
    connection.query('select id, name, note from users where id=?', [user.id], callback);
  });
}
User.prototype.destory = function(callback) {
  var user = {
    id : this.id
  };
  pool.getConnection(function(err, connection) {
    connection.query('delete from users where id=?', [user.id], callback);
  });
}
User.prototype.query = function(callback) {
  var user = {
    name : this.name
  };
  pool.getConnection(function(err, connection) {
    connection.query('select id, name, note from users where name=?', [user.name],
        callback);
  });
}

module.exports = User;
