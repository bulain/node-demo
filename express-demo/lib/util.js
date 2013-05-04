exports.isArray = function(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
};

exports.isFunction = function(obj) {
  return typeof(obj) == 'function';
};

exports.isString = function(obj) {
  return typeof(obj) == 'string';
};
