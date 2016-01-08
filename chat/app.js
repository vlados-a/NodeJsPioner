
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , config = require('config');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(function(req, res, next){
    if(req.url == '/home'){
      res.end('you are on home page')
    }
    else{
      next();
    } 
  });
  app.use(function(req, res, next){
    if(req.url == '/admin'){
      res.end('you are on admin page');
    }
    else{
      next();
    }
  });
  app.use(function(req, res, next){
    if(req.url == '/error'){
      bla();
    }
    else{
      next();
    }
  });
  app.use(function(req, res, next){
    if(req.url == '/forbiden'){
      next(new Error('Access denied'));
    }
    else{
      next();
    }
  });
  app.use(function(req, res){
    res.send(404, 'Page not found');
  });
  app.use(function(err, req, res, next){
    console.log(app.get('env'));
    if(app.get('env') == 'development'){
      res.end('Sorry. Some error ' + err.message);  
    }
    else{
      var handler = express.errorHandler();
      handler(err, req, res, next);
    }
    
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(config.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
