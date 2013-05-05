var mysql = require('mysql');
var config = require('./config');

module.exports = function(){
  config.load('./database.json');
  var current = config.getCurrent();
  console.info("Using", current.env, "settings:\n", current.settings);
  
  return mysql.createPool({
    host     : current.settings.host,
    user     : current.settings.user,
    password : current.settings.password,
    database : current.settings.database
  });
}();
