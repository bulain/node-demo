var async = require('async');
var should = require('should');

describe('async', function() {
  var random = function() {
    return Math.floor(Math.random() * 100);
  };
  var func1 = function(callback) {
    var time = random();
    setTimeout(function() {
      console.log('func1 take ' + time + 'ms');
      callback(null, 'func1');
    }, time);
  };
  var func2 = function(callback) {
    var time = random();
    setTimeout(function() {
      console.log('func2 take ' + time + 'ms');
      callback(null, 'func2');
    }, time);
  };
  var func3 = function(callback) {
    var time = random();
    setTimeout(function() {
      console.log('func3 take ' + time + 'ms');
      callback(null, 'func3');
    }, time);
  };
  var func4 = function(callback) {
    var time = random();
    setTimeout(function() {
      console.log('func4 take ' + time + 'ms');
      callback(null, 'func4');
    }, time);
  };
  var funcArray = [func1, func2, func3];
  var funcJson = {
    func1 : func1,
    func2 : func2,
    func3 : func3
  };

  describe('#series', function() {
    it('demo parameters with array', function(done) {
      console.log();
      async.series(funcArray, function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.eql(['func1', 'func2', 'func3']);
        done();
      });
    });
    it('demo parameters with json', function(done) {
      console.log();
      async.series(funcJson, function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.eql({
          func1 : 'func1',
          func2 : 'func2',
          func3 : 'func3'
        });
        done();
      });
    });
  });
  describe('#parallel', function() {
    it('demo parameters with array', function(done) {
      console.log();
      async.parallel(funcArray, function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.eql(['func1', 'func2', 'func3']);
        done();
      });
    });
    it('demo parameters with json', function(done) {
      console.log();
      async.parallel(funcJson, function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.eql({
          func1 : 'func1',
          func2 : 'func2',
          func3 : 'func3'
        });
        done();
      });
    });
  });
  describe('#auto', function() {
    it('demo no previous task results', function(done) {
      console.log();
      async.auto({
        func1 : func1,
        func2 : func2,
        func3 : ['func1', 'func2', func3],
        func4 : ['func3', func4]
      }, function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.eql({
          func1 : 'func1',
          func2 : 'func2',
          func3 : 'func3',
          func4 : 'func4'
        });
        done();
      });
    });
    it('demo with previous task results', function(done) {
      var func3 = function(callback, results) {
        console.log('func1 results: ' + results.func1);
        console.log('func2 results: ' + results.func2);
        var time = random();
        setTimeout(function() {
          console.log('func3 take ' + time + 'ms');
          callback(null, 'func3', time);
        }, time);
      };
      var func4 = function(callback, results) {
        console.log('func3 results: ' + results.func3);
        var time = random();
        setTimeout(function() {
          console.log('func4 take ' + time + 'ms');
          callback(null, 'func4');
        }, time);
      };

      console.log();
      async.auto({
        func1 : func1,
        func2 : func2,
        func3 : ['func1', 'func2', func3],
        func4 : ['func3', func4]
      }, function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.include({
          func1 : 'func1',
          func2 : 'func2',
          func4 : 'func4'
        });
        results.should.have.property('func3');
        done();
      });
    });
  });
  describe('#waterfall', function() {
    it('demo how to passed parameters', function(done) {
      var func2 = function(param, callback) {
        console.log('param: ' + param);
        var time = random();
        setTimeout(function() {
          console.log('func2 take ' + time + 'ms');
          callback(null, 'func2');
        }, time);
      };
      var func3 = function(param, callback) {
        console.log('param: ' + param);
        var time = random();
        setTimeout(function() {
          console.log('func3 take ' + time + 'ms');
          callback(null, 'func3', time);
        }, time);
      };
      var func4 = function(param1, param2, callback) {
        console.log('param1: ' + param1);
        console.log('param2: ' + param2);
        var time = random();
        setTimeout(function() {
          console.log('func4 take ' + time + 'ms');
          callback(null, 'func4');
        }, time);
      };

      console.log();
      async.waterfall([func1, func2, func3, func4], function(err, results) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log(results);
        results.should.eql('func4');
        done();
      });
    });
  });
});