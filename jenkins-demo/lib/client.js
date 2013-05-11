var http = require('http');
var async = require('async');
var util = require('../lib/util');

var getJson = function(option, callback) {
  option = option || {};
  var utl = option.prefix + '/' + option.project + '/' + option.build
      + '/api/json';
  http.get(utl, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var jres = JSON.parse(body)
      callback(null, jres);
    });
  }).on('error', function(e) {
    callback(e);
  }).end();
};

var getTreeJson = function(option, callback) {
  var opt = option;
  var jsons = [];
  async.whilst(function() {
    return opt;
  }, function(cb) {
    getJson(opt, function(err, json) {
      if (err) {
        callback(err);
        return;
      }
      jsons.push(json);
      var parent = util.getParent(json);
      opt = util.getOption(opt, parent);
      cb();
    });
  }, function() {
    callback(null, jsons);
  });
};

var getFailedJson = function(option, callback) {
  var opt = option;
  var jsons = [];
  var result = null;
  var index = -1;
  async.doWhilst(function(cb) {
    getJson(opt, function(err, json) {
      if (err) {
        callback(err);
        return;
      }

      index++;
      opt.build = opt.build - 1;
      result = json.result;
      if ((index <= 0)
          || (index > 0 && result != 'SUCCESS')) {
        jsons.push(json);
      }

      cb();
    });
  }, function() {
    return (index <= 0 && result == 'SUCCESS')
        || (index > 0 && result != 'SUCCESS');
  }, function() {
    callback(null, jsons);
  });
};

exports.getJson = getJson;
exports.getTreeJson = getTreeJson;
exports.getFailedJson = getFailedJson;
