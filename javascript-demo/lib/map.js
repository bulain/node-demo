var CmdQueue = require('./cmdQueue');

var Map = function() {
  this._cmdQueue = new CmdQueue();
  this.renderBaseMap();
};

Map.prototype.renderBaseMap = function(baseMap) {
  this._cmdQueue.pushCmd({
    lvl : 0,
    cmd : asyncCmd.bind(this, 'renderBaseMap')
  });
};

Map.prototype.addLayer = function(layer, autoAdjust) {
  this._cmdQueue.pushCmd({
    lvl : 1,
    cmd : asyncCmd.bind(this, layer)
  });
};

Map.prototype.removeLayer = function(layer) {
  this._cmdQueue.pushCmd({
    lvl : 2,
    cmd : asyncCmd.bind(this, layer)
  });
};

Map.prototype.destory = function() {
  this._cmdQueue.pushCmd({
    lvl : 3,
    cmd : syncCmd.bind(this, 'destory')
  });
};

Map.prototype.ready = function(fn) {
  this._cmdQueue.pushFn(fn.bind(this));
}

// mock methods
function asyncCmd(name, callback) {
  var timeout = Math.ceil(Math.random() * 1000);
  setTimeout(function() {
    console.log('asyncCmd-' + name + '-' + timeout);
    callback(null);
  }, timeout);
}

function syncCmd(name, callback) {
  console.log('syncCmd-' + name);
  callback(null);
}

module.exports = Map;
