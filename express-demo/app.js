
/**
 * Module dependencies.
 */

var express = require('express')
  , expressValidator = require('express-validator')
  , routes = require('./routes')
  , users = require('./routes/users')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , flash = require('connect-flash')
  , i18next = require('i18next');

//var log4js = require('log4js');
//log4js.configure('log4js.json', {});

i18next.init();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.use(flash());
app.use(expressValidator);
app.use(i18next.handle);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

i18next.registerAppHelper(app);

app.get('/', routes.index);

app.get('/users', users.list);
app.get('/users/new', users.new);
app.put('/users', users.create);
app.get('/users/:id', users.edit);
app.post('/users/:id', users.update);
app.delete('/users/:id', users.delete);

app.get('/user', user.list);
app.get('/user/new', user.new);
app.put('/user', user.create);
app.get('/user/:id', user.edit);
app.post('/user/:id', user.update);
app.delete('/user/:id', user.delete);

// cluster
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.info('Master process ' + process.pid + ' start');
  
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.info('worker ' + worker.process.pid + ' died');
  });
} else {
  http.createServer(app).listen(app.get('port'), function(){
    console.info('Worker process ' + process.pid + ' listening on port ' + app.get('port'));
  });
}

module.exports = app;