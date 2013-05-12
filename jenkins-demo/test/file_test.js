var file = require('../lib/file');
var should = require('should');

describe('file', function() {
  var prefix = 'http://localhost/jenkins/job';
  var project = 'activiti5-demo';

  describe('#writeLog', function() {
    it('should write log into file', function(done) {
      file.writeLog({
        prefix : prefix,
        project : project,
        build : '94',
        file : '2.log'
      }, function(err) {
        if (err) {
          done(err);
        }
        done();
      });
    });
  });
});