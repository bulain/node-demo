var User = require('../lib/user');

exports.list = function(req, res){
  var user = new User();
  user.list(function(err, rows) {
    if (err)
      req.flash('error', err);
    res.render('user/list', { title: 'User List', users: rows });
  });
};
exports.new = function(req, res){
  var user = new User();
  res.render('user/new', { title: 'New User', user: user });
};
exports.create = function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.note = req.body.note;
  user.create(function(err, results) {
    if (err){
      req.flash('error', err);
      res.render('user/new', { title: 'New User', user: user });
    }
    res.redirect('/users'); 
  });
};
exports.edit = function(req, res){
  var user = new User();
  user.id = req.params.id;
  user.get(function(err, rows) {
    if (err)
      req.flash('error', err);
    res.render('user/edit', { title: 'Edit User', user: rows[0] });
  });
};
exports.update = function(req, res){
  var user = new User();
  user.id = req.params.id;
  user.name = req.body.name;
  user.note = req.body.note;
  user.update(function(err, results) {
    if (err){
      req.flash('error', err);
      res.render('user/edit', { title: 'Edit User', user: user });
    }
    res.redirect('/users'); 
  });
};
exports.delete = function(req, res){
  var user = new User();
  user.id = req.params.id;
  user.delete(function(err, results) {
    if (err){
      req.flash('error', err);
    }
    res.redirect('/users'); 
  });
};
