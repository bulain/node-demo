var util = require('../lib/util');
var should = require('should');
var json = require('../test/api.json');

describe('util', function() {
  describe('#getParent', function() {
    it('should return cause ', function() {
      var parent = util.getParent(json);
      parent.should.include({
        upstreamBuild : 51,
        upstreamProject : "common",
      });
    });
  });
  describe('#getOption', function() {
    it('should return option ', function() {
      var option = {
        prefix : 'prefix',
        project : 'project',
        build : '2'
      };
      var cause = {
        upstreamBuild : '1',
        upstreamProject : "test",
        upstreamUrl : 'job/common/'
      };
      var opt = util.getOption(option, cause);
      opt.should.include({
        prefix : 'prefix',
        project : "test",
        build : '1'
      });
    });
    it('should return empty ', function() {
      var option = {
        prefix : 'prefix',
        project : 'project',
        build : '2'
      };
      var cause = null;
      var opt = util.getOption(option, cause);
      should.not.exist(opt);
    });
  });
});
