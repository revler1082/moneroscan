var bluebird = require('bluebird');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var apiVersion = 1;
var models = require('./routes/' + apiVersion + '/data/models');

// clean up environment variable ..
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_ENV = process.env.NODE_ENV.trim();
if(process.env.NODE_ENV.indexOf('dev') >= 0) process.env.NODE_ENV = 'development';

// get the right config ..
var config = require('./config')[process.env.NODE_ENV];

// view engine setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// configure serving of static files..
app.use(config.express.siteRoot + '', express.static(__dirname + '/www'));

// configure logging, parsing, and favicon..
//app.use(favicon(__dirname + '/www/favicon.ico'));
if(app.get('env') === 'development') { app.use(logger('dev')) };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api setup
var router = express.Router();
router.get('/', function(req, res) { res.json({ message: 'welcome to the ' + config.prettyName + ' api! (v' + apiVersion + ')' }); });
app.use(config.express.siteRoot + 'api/' + apiVersion, router);
app.use(config.express.siteRoot + 'api/' + apiVersion + '/blocks', require('./routes/' + apiVersion + '/BlockRoute'));
// catch api errors and forward to error handler 
app.use(config.express.siteRoot + 'api/' + apiVersion + '/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// single page app, make all requests (non-api) return same page..
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'www', 'index.html'));
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

if(!module.parent || process.env.NODE_ENV === 'production') {
  var port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('Magic happens on port ' + port);
  });
}

module.exports = app;
