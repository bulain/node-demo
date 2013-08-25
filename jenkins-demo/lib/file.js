var client = require('../lib/client');
var fs = require('fs');

/**
 * Process the result when write to file.
 * @callback fileCallback
 * @param {Object} err The err object. 
 */

/**
 * Write log into file.
 * @param {Oject}
 * @param {String} option.prefix The prefix string.
 * @param {String} option.project The project name.
 * @param {String} option.build The build number.
 * @param {String} option.file The log file.
 * @param {fileCallback} callback The callback of write to file.
 */
var writeLog = function(option, callback) {
  client.getTreeJson(option, function(err, jsons) {
    if (err) {
      return callback(err);
    }

    var chunk = '';
    jsons.forEach(function(json) {
      return json.changeSet.items.forEach(function(item) {
        chunk += item.id + '\n';
        item.paths.forEach(function(path) {
          chunk += '  ' + path.file + '\n';
        });
      });
    });

    fs.writeFile(option.file, chunk, function(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });

  });
};



exports.writeLog = writeLog;
