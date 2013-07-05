var oo = {};
function oo_object() {}
oo.test_obj = function (val) {
  var xx = new oo_object, i = -1, n = arguments.length;
  while (++i < n) xx[arguments[i]] = val + '-val';
  return xx;
};
var obj1 = oo.test_obj('test');
var obj2 = new oo.test_obj('test');

console.log(obj1);
console.log(obj2);

