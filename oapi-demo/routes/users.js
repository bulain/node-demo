var express = require('express');
var mysql = require('../lib/mysql');
var mongo = require('../lib/mongo');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ 'body': 'respond with a resource' });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  res.json({ 'success': true });
});

router.get('/mysql', function (req, res, next) {
  mysql.row('select * from users')
    .then(function (s) {
      res.json(s);
    }).catch(function(e){
      res.json(e);
    });;
});

router.get('/mongo', function (req, res, next) {
  // mongo.insertOrUpdate('users', {'name':'abc'}).then(function(s){
  //   res.json(s);
  // });
  // mongo.insertOrUpdate('users', {'_id': '5b2e67702711e00b089bd5c6', 'name':'abd'}).then(function(s){
  //   res.json(s);
  // });
  // mongo.save('users', {'name':'abc'}).then(function(s){
  //   res.json(s);
  // });
  mongo.save('users', {'_id': '5b2e6f7c8961532a44ac9fc0', 'name':'abf'}).then(function(s){
    res.json(s);
  })
  // mongo.find('users', {'name': 'abe'}).then(function(s){
  //   res.json(s);
  // });
  // mongo.remove('users', {'_id': '5b2e69e91d7d3d2f08099e7b'}).then(function(s){
  //   res.json(s);
  // });
  .catch(function(e){
    res.json(e);
  });
});

module.exports = router;
