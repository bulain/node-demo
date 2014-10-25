var express = require('express');
var http = require('http');
var socket = require('socket.io');

var app = express();
app.set('port', process.env.PORT || 8000);
app.use(express.static(__dirname));

var server = http.createServer(app);
var io = socket(server);

io.on('connection', function(socket) {
    socket.emit('news', {
        hello : 'world'
    });
    socket.on('my other event', function(data) {
        console.log(data);
    });
});

server.listen(app.get('port'), function() {
    console.info('Worker process ' + process.pid + ' listening on port ' + app.get('port'));
});

module.exports = app;
