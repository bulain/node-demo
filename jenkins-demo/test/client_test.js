var client = require('../lib/client');
var should = require('should');

describe('client', function() {
  var prefix = 'http://localhost/jenkins/job';
  var project = 'activiti5-demo';

  describe('#getJson', function() {
    it('should return SUCCESS when lastSuccessfulBuild', function(done) {
      client.getJson({
        prefix : prefix,
        project : project,
        build : 'lastSuccessfulBuild'
      }, function(err, json) {
        if (err) {
          return done(err);
        }

        json.should.include({
          result : 'SUCCESS'
        });
        json.should.have.property('number');

        done();
      });
    });
    it('should return SUCCESS when build 94', function(done) {
      client.getJson({
        prefix : prefix,
        project : project,
        build : '94'
      }, function(err, json) {
        if (err) {
          console.log(util.inspect(err));
          return;
        }

        json.should.include({
          result : 'SUCCESS'
        });
        json.should.include({
          number : 94
        });
        json.should.have.property('number');

        done();
      });
    });
  });
  describe('#getTreeJson', function() {
    it('should return 3 array when 97', function(done) {
      client.getTreeJson({
        prefix : prefix,
        project : project,
        build : '97'
      }, function(err, jsons) {
        if (err) {
          return done(err);
        }

        jsons.should.not.be.empty;
        jsons.should.have.lengthOf(3);

        done();
      });
    });
    it('should return 1 array when 94', function(done) {
      client.getTreeJson({
        prefix : prefix,
        project : project,
        build : '94'
      }, function(err, jsons) {
        if (err) {
          return done(err);
        }

        jsons.should.not.be.empty;
        jsons.should.have.lengthOf(1);

        done();
      });
    });
  });
});