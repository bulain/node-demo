var CmdQueue = function(){
  this._queue = [];
  this._fns = [];
  this._processed = true;
};

CmdQueue.prototype.pushCmd = function(cmd){
  this._queue.push(cmd);
  this._processQueue();
};

CmdQueue.prototype.pushFn = function(fn){
  this._fns.push(fn);
};

CmdQueue.prototype._processQueue = function(){
  var processing = [];
  var lvl = 10;
  var obj;
  var that = this;
  
  while (this._processed && this._queue.length && (obj = this._queue[0], obj.lvl <= lvl)) {
    lvl = obj.lvl;
    processing.push(this._queue.shift());
  }

  if (processing.length) {
    this._processed = false;
    asyncEach(processing, function(item, cb) {
      item.cmd(cb);
    }, function(err) {
      that._processed = true;
      that._processQueue();
    });
  } else if (!this._queue.length) {
    var fns = this._fns.slice();
    this._fns.length = 0;
    while (fns.length) {
      var fn = fns.shift();
      fn.call();
    }
  }
};

function noop(){}
function asyncEach(arr, iterator, callback){
  callback = callback || noop;
  
  if(!arr.length){
    return callback();
  }
  
  var completed = 0;
  arr.forEach(function(item){
    iterator(item, function(err){
      completed ++ ;
      if(err){
        callback(err);
        callback = noop;
      }else{
        if(completed >= arr.length){
          callback(null);
        }
      }
    });
  });
}

module.exports = CmdQueue;