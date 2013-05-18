var http = require('http');
var async = require('async');
var util = require('../lib/util');

var getJson = function(option, callback) {
  option = option || {};
  var url = option.prefix + '/' + option.project + '/' + option.build
      + '/api/json';
  http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      try {
        var jres = JSON.parse(body);
        jres.project = option.project;
        callback(null, jres);
      } catch (e) {
        console.log('Error URL: ' + url);
        callback(null, null);
      }
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
      if (json) {
        jsons.push(json);
        var parent = util.getUpstream(json);
        opt = util.getOption(opt, parent);
      } else {
        opt = null;
      }
      cb();
    });
  }, function() {
    callback(null, jsons);
  });
};

var getFailedJson = function(option, callback) {
  var opt = option;
  var jsons = [];
  var index = -1;
  async.doWhilst(function(cb) {
    getJson(
        opt,
        function(err, json) {
          if (err) {
            callback(err);
            return;
          }

          index++;
          if (json && ((index <= 0 && json.result == 'SUCCESS') 
              || (index > 0 && json.result != 'SUCCESS'))) {
            jsons.push(json);
            opt.build = json.number - 1;
          } else {
            opt = null;
          }

          cb();
        });
  }, function() {
    return opt;
  }, function() {
    callback(null, jsons);
  });
};

var getThroughJson = function(option, callback) {
  var opt = option;
  var jsons = [];
  var temp = [];
  var index = -1;
  async.doWhilst(function(cb) {
    getJson(opt, function(err, json) {
      if (err) {
        callback(err);
        return;
      }

      index++;
      if (json && ((index <= 0 && json.result == 'SUCCESS')
          || (index > 0 && json.result != 'SUCCESS'))) {
        jsons.push(json);
        temp.push(json);
        opt.build = json.number - 1;
      } else {
        opt = null;
        while (temp.length && opt == null) {
          index = -1;
          json = temp.shift();
          opt = util.getOption(option, util.getUpstream(json));
        }
      }

      cb();
    });
  }, function() {
    return opt;
  }, function() {
    callback(null, jsons);
  });
};

exports.getJson = getJson;
exports.getTreeJson = getTreeJson;
exports.getFailedJson = getFailedJson;
exports.getThroughJson = getThroughJson;
