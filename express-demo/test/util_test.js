var assert = require('assert');
var util = require('../lib/util');

describe('util', function() {
  describe('#isArray', function() {
    it('should return true when []', function() {
      assert.equal(true, util.isArray([]));
    });
    it('should return false when object', function() {
      assert.equal(false, util.isArray({}));
    });
    it('should return false when string', function() {
      assert.equal(false, util.isArray(''));
    });
    it('should return false when number', function() {
      assert.equal(false, util.isArray(1));
    });
  });
  describe('#isFunction', function() {
    it('should return true when function', function() {
      assert.equal(true, util.isFunction(function() {
      }));
    });
    it('should return false when object', function() {
      assert.equal(false, util.isFunction({}));
    });
  });
  describe('#isString', function() {
    it('should return true when string', function() {
      assert.equal(true, util.isString(''));
    });
    it('should return false when object', function() {
      assert.equal(false, util.isString({}));
    });
  });
});