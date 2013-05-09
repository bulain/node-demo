var userdao = require('../lib/user');
var i18n = require("i18next");

var action = {
  list : function(req, res){
    userdao.list(function(err, rows) {
      if (err){
        req.flash('err', err);
      }
      res.render('user/list', { title: i18n.t('user.model'), users: rows, flash: req.flash() });
    });
  },
  new : function(req, res){
    var user = {name:'', note:''};
    res.render('user/new', { title: i18n.t('user.model'), user: user, flash: req.flash() });
  },
  create : function(req, res){
    var user = req.body.user || {};
    
    req.assert('user.name', 'can not be empty.').notEmpty();
    var valerr = req.validationErrors();
    if (valerr){
      req.flash('valerr', valerr);
      res.render('user/new', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      return;
    }
    
    userdao.create(user, function(err, results) {
      if (err){
        req.flash('err', err);
        res.render('user/new', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      }else{
        req.flash('inf', 'Success create ' + i18n.t('user.model') + '.');
        res.redirect('/user');
      }
    });
  },
  edit : function(req, res){
    var id = req.params.id;
    userdao.get(id, function(err, rows) {
      if (err){
        req.flash('err', err);
      }
      res.render('user/edit', { title: i18n.t('user.model'), user: rows[0], flash: req.flash() });
    });
  },
  update : function(req, res){
    var user = req.body.user || {};
    user.id = req.params.id;
    
    req.assert('user.name', 'can not be empty.').notEmpty();
    var valerr = req.validationErrors();
    if (valerr){
      req.flash('valerr', valerr);
      res.render('user/edit', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      return;
    }
    
    userdao.update(user, function(err, results) {
      if (err){
        req.flash('err', err);
        res.render('user/edit', { title: i18n.t('user.model'), user: user, flash: req.flash() });
      }else{
        req.flash('inf', 'Success update ' + i18n.t('user.model') + '.');
        res.redirect('/user');
      }
    });
  },
  delete : function(req, res){
    var id = req.params.id;
    userdao.delete(id, function(err, results) {
      if (err){
        req.flash('err', err);
      }else{
        req.flash('inf', 'Success delete ' + i18n.t('user.model') + '.');
      }
      res.redirect('/user');
    });
  }
};

module.exports = action;
