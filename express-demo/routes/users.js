var User = require('../lib/users');
var i18n = require("i18next");

var action = {
  list : function(req, res){
    var user = new User();
    user.list(function(err, rows) {
      if (err)
        req.flash('err', err);
      res.render('users/list', { title: i18n.t('user.model'), users: rows, flash: req.flash() });
    });
  },
  new : function(req, res){
    var user = new User();
    user.name = '';
    user.note = '';
    res.render('users/new', { title: i18n.t('user.model'), user: user, flash: req.flash() });
  },
  create : function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.note = req.body.note;
    
    req.assert('name', 'can not be empty.').notEmpty();
    var valerr = req.validationErrors();
    if (valerr){
      req.flash('valerr', valerr);
      res.render('user/new', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      return;
    }
    
    user.create(function(err, results) {
      if (err){
        req.flash('err', err);
        res.render('users/new', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      }
      res.redirect('/users'); 
    });
  },
  edit : function(req, res){
    var user = new User();
    user.id = req.params.id;
    user.get(function(err, rows) {
      if (err)
        req.flash('err', err);
      res.render('users/edit', { title: i18n.t('user.model'), user: rows[0], flash: req.flash() });
    });
  },
  update : function(req, res){
    var user = new User();
    user.id = req.params.id;
    user.name = req.body.name;
    user.note = req.body.note;
    
    req.assert('user.name', 'can not be empty.').notEmpty();
    var valerr = req.validationErrors();
    if (valerr){
      req.flash('valerr', valerr);
      res.render('user/edit', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      return;
    }
    
    user.update(function(err, results) {
      if (err){
        req.flash('err', err);
        res.render('users/edit', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      }
      res.redirect('/users'); 
    });
  },
  delete : function(req, res){
    var user = new User();
    user.id = req.params.id;
    user.delete(function(err, results) {
      if (err){
        req.flash('err', err);
      }
      res.redirect('/users'); 
    });
  }
};

module.exports = action;
