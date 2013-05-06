var pool = require('./pool');

var dao = {
  create : function(user, callback) {
    pool.getConnection(function(err, conn) {
      conn.query('insert into users set ? ', user, function(err, results) {
        callback.apply(this, arguments);
        conn.end();
      });
    });
  },
  update : function(user, callback) {
    pool.getConnection(function(err, conn) {
      conn.query('update users set name=?, note=? where id=?', [user.name,
          user.note, user.id], function(err, results) {
        callback.apply(this, arguments);
        conn.end();
      });
    });
  },
  get : function(id, callback) {
    pool.getConnection(function(err, conn) {
      conn.query('select id, name, note from users where id=?', id, function(
          err, results) {
        callback.apply(this, arguments);
        conn.end();
      });
    });
  },
  delete : function(id, callback) {
    pool.getConnection(function(err, conn) {
      conn.query('delete from users where id=?', id, function(err, results) {
        callback.apply(this, arguments);
        conn.end();
      });
    });
  },
  list : function(callback) {
    pool.getConnection(function(err, conn) {
      conn.query('select id, name, note from users', function(err, results) {
        callback.apply(this, arguments);
        conn.end();
      });
    });
  },
  find : function(user, callback) {
    pool.getConnection(function(err, conn) {
      conn.query('select id, name, note from users where name=?', [user.name],
          function(err, results) {
            callback.apply(this, arguments);
            conn.end();
          });
    });
  }
};

module.exports = dao;
