var CmdQueue = require('./cmdQueue');

var Map = function() {
  this._cmds = [];
  this._cmdQueue = new CmdQueue();
  this.renderBaseMap();
};

Map.prototype.renderBaseMap = function(baseMap) {
  this._cmdQueue.pushCmd({
    lvl : 0,
    cmd : asyncCmd.bind(this, 'renderBaseMap')
  });
};

Map.prototype.bounds = function(bounds) {
  this._cmdQueue.pushCmd({
    lvl : 0,
    cmd : asyncCmd.bind(this, "bounds")
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
    lvl : 0,
    cmd : syncCmd.bind(this, 'destory')
  });
};

Map.prototype.ready = function(fn) {
  this._cmdQueue.pushFn(fn.bind(this));
}

// mock methods
function asyncCmd(name, callback) {
  var timeout = Math.ceil(Math.random() * 10);
  setTimeout(function() {
    this._cmds.push(name);
    callback();
  }.bind(this), timeout);
}

function syncCmd(name, callback) {
  this._cmds.push(name);
  callback();
}

module.exports = Map;
