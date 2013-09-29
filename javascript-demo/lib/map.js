var async = require('async');

var Map = function() {
  this.queue = [];
  this.fns = [];
  this.processed = true;
  this.renderBaseMap();
};

Map.prototype.processQueue = function() {
  var processing = [];
  var lvl = 10;
  var obj;
  
  while (this.processed && this.queue.length && (obj = this.queue[0], obj.lvl <= lvl)) {
    lvl = obj.lvl;
    processing.push(this.queue.shift());
  }

  var that = this;
  if (processing.length) {
    this.processed = false;
    async.each(processing, function(item, cb) {
      item.cmd(cb);
    }, function(err) {
      that.processed = true;
      that.processQueue();
    });
  } else if (!this.queue.length) {
    while (this.fns.length) {
      var fn = this.fns.shift();
      fn.call();
    }
  }
};

Map.prototype.renderBaseMap = function(baseMap) {
  this.queue.push({
    lvl : 0,
    cmd : asyncCmd.bind(this, 'renderBaseMap', 1000)
  });
  this.processQueue();
};

Map.prototype.addLayer = function(layer, autoAdjust) {
  this.queue.push({
    lvl : 1,
    cmd : asyncCmd.bind(this, layer, Math.ceil(Math.random() * 1000))
  });
  this.processQueue();
};

Map.prototype.removeLayer = function(layer) {
  this.queue.push({
    lvl : 2,
    cmd : asyncCmd.bind(this, layer, 10)
  });
  this.processQueue();
};

Map.prototype.destory = function() {
  this.queue.push({
    lvl : 3,
    cmd : syncCmd.bind(this, 'destory')
  });
  this.processQueue();
};

Map.prototype.ready = function(fn) {
  this.fns.push(fn.bind(this));
}

// mock methods
function asyncCmd(name, timeout, callback) {
  setTimeout(function() {
    console.log('asyncCmd-' + name + '-' + timeout);
    callback(null);
  }, timeout);
}

function syncCmd(name, callback) {
  setTimeout(function() {
    console.log('syncCmd-' + name);
    callback(null);
  });
}

module.exports = Map;
