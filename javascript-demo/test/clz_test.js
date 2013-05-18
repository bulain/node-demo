var requirejs = require('requirejs');

requirejs.config({
  nodeRequire : require
});

requirejs(['../lib/clz'], function(Clz) {
  console.log(Clz);
  Clz.initialize({
    'log' : 'debug'
  });
  console.log(Clz);
});
