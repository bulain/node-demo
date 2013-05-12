var client = require('../lib/client');
var fs = require('fs');

var writeLog = function(option, callback) {
  client.getThroughJson(option, function(err, jsons) {
    if (err) {
      return callback(err);
    }
    var stream = fs.createWriteStream(option.file);
    stream.once('open', function(fd) {
      for ( var i in jsons) {
        var items = jsons[i].changeSet.items;
        for ( var j in items) {
          stream.write(items[j].id + '\n');

          var paths = items[j].paths;
          for ( var k in paths) {
            stream.write('  ' + paths[k].file + '\n');
          }
        }
      }
      stream.end();
      callback();
    });
  });
};

exports.writeLog = writeLog;
