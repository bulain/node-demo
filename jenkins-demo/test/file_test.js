var file = require('../lib/file');
var should = require('should');

describe('file', function() {
  var prefix = 'http://localhost/jenkins/job';
  var project = 'activiti5-demo';
  var number = process.env.BUILD_NUMBER || '0';

  describe('#writeLog', function() {
    it('should write change set into file', function(done) {
      file.writeLog({
        prefix : prefix,
        project : project,
        build : 'lastSuccessfulBuild',
        file : number + '.log'
      }, function(err) {
        if (err) {
          done(err);
        }
        done();
      });
    });
  });
});