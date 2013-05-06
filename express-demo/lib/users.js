var pool = require('./pool');

var User = function() {
}

User.prototype.create = function(callback) {
  var user = {
    name : this.name,
    note : this.note
  };
  pool.getConnection(function(err, conn) {
    conn.query('insert into users (name, note) values(?, ?)', [user.name,
        user.note], function(err, results) {
      callback.apply(this, arguments);
      conn.end();
    });
  });
};
User.prototype.update = function(callback) {
  var user = {
    id : this.id,
    name : this.name,
    note : this.note
  };
  pool.getConnection(function(err, conn) {
    conn.query('update users set name=?, note=? where id=?', [user.name,
        user.note, user.id], function(err, results) {
      callback.apply(this, arguments);
      conn.end();
    });
  });
};
User.prototype.get = function(callback) {
  var user = {
    id : this.id
  };
  pool.getConnection(function(err, conn) {
    conn.query('select id, name, note from users where id=?', [user.id],
        function(err, results) {
          callback.apply(this, arguments);
          conn.end();
        });
  });
};
User.prototype.delete = function(callback) {
  var user = {
    id : this.id
  };
  pool.getConnection(function(err, conn) {
    conn.query('delete from users where id=?', [user.id],
        function(err, results) {
          callback.apply(this, arguments);
          conn.end();
        });
  });
};
User.prototype.list = function(callback) {
  var user = {
    name : this.name
  };
  pool.getConnection(function(err, conn) {
    conn.query('select id, name, note from users',
        function(err, results) {
          callback.apply(this, arguments);
          conn.end();
        });
  });
};
User.prototype.find = function(callback) {
  var user = {
    name : this.name
  };
  pool.getConnection(function(err, conn) {
    conn.query('select id, name, note from users where name=?', [user.name],
        function(err, results) {
          callback.apply(this, arguments);
          conn.end();
        });
  });
};

module.exports = User;
