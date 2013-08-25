var http = require('http');
var async = require('async');
var util = require('../lib/util');

/**
 * The module client.
 * @module client
 */

/**
 * The client option object.
 * @typedef {Object} ClientOption 
 * @property {String} prefix The prefix string.
 * @property {String} project The project name.
 * @property {String} build The build number.
 */

/**
 * Process the content of json content.
 * @callback JsonCallback
 * @param {Object} err The err object. 
 * @param {Object} json The json content.
 */

/**
 * Get json from given option.
 * @param {ClientOption} option The option object.
 * @param {JsonCallback} callback The callback of process json.
 */
exports.getJson = function(option, callback) {
  option = option || {};
  var url = option.prefix + '/' + option.project + '/' + option.build + '/api/json';
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

/**
 * The tree json from given option.
 * @param {ClientOption} option The option object.
 * @param {JsonCallback} callback The callback of process json.
 */
exports.getTreeJson = function(option, callback) {
  var opt = option;
  var jsons = [];
  var upstreams = [];
  async.whilst(function() {
    return opt;
  }, function(cb) {
    exports.getJson(opt, function(err, json) {
      if (err) {
        callback(err);
        return;
      }
      if (json) {
        jsons.push(json);
        var ups = util.getUpstreams(json);
        upstreams = upstreams.concat(ups);
      } 
      
      if(upstreams.length){
        var next = upstreams.shift();
        opt = util.getOption(opt, next);
      }else{
        opt = null;
      }
      
      cb();
    });
  }, function() {
    callback(null, jsons);
  });
};
