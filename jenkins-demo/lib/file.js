var client = require('../lib/client');
var fs = require('fs');

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
