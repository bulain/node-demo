var client = require('../lib/client');
var fs = require('fs');

/**
 * The module file.
 * @module file
 */

/**
 * The file option object.
 * @typedef {Object} FileOption 
 * @property {String} prefix The prefix string.
 * @property {String} project The project name.
 * @property {String} build The build number.
 * @property {String} file The log file.
 */

/**
 * Process the result when write to file.
 * @callback FileCallback
 * @param {Object} err The err object. 
 */

/**
 * Write log into file.
 * @param {FileOption} option The option object.
 * @param {FileCallback} callback The callback of write to file.
 */
exports.writeLog = function(option, callback) {
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
