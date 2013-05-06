var userdao = require('../lib/user');
var i18n = require("i18next");

exports.list = function(req, res){
  userdao.list(function(err, rows) {
    if (err)
      req.flash('error', err);
    res.render('user/list', { title: i18n.t('user.model'), users: rows });
  });
};
exports.new = function(req, res){
  var user = {name:'', note:''};
  res.render('user/new', { title: i18n.t('user.model'), user: user });
};
exports.create = function(req, res){
  var user = req.body.user || {};
  userdao.create(user, function(err, results) {
    if (err){
      req.flash('error', err);
      res.render('user/new', { title: i18n.t('user.model'), user: user });
    }
    res.redirect('/user'); 
  });
};
exports.edit = function(req, res){
  var id = req.params.id;
  userdao.get(id, function(err, rows) {
    if (err)
      req.flash('error', err);
    res.render('user/edit', { title: i18n.t('user.model'), user: rows[0] });
  });
};
exports.update = function(req, res){
  var user = req.body.user || {};
  user.id = req.params.id;
  userdao.update(user, function(err, results) {
    if (err){
      req.flash('error', err);
      res.render('user/edit', { title: i18n.t('user.model'), user: user });
    }
    res.redirect('/user'); 
  });
};
exports.delete = function(req, res){
  var id = req.params.id;
  userdao.delete(id, function(err, results) {
    if (err){
      req.flash('error', err);
    }
    res.redirect('/user'); 
  });
};
