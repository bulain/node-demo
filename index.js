var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/newn"] = requestHandlers.newn;
handle["/create"] = requestHandlers.create;
handle["/favicon.ico"] = requestHandlers.favicon;

server.start(router.route, handle);
