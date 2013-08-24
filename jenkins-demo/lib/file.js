var client = require('../lib/client');
var fs = require('fs');

var writeLog = function(option, callback) {
  client.getTreeJson(option, function(err, jsons) {
    if (err) {
      return callback(err);
    }

    var chunk = '';
    for ( var i in jsons) {
      var items = jsons[i].changeSet.items;
      for ( var j in items) {
        chunk += items[j].id + '\n';

        var paths = items[j].paths;
        for ( var k in paths) {
          chunk += '  ' + paths[k].file + '\n';
        }
      }
    }

    fs.writeFile(option.file, chunk, function(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });

  });
};

exports.writeLog = writeLog;
