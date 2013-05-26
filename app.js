
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider();

app.get('/', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('index.jade', {
          title: 'Blog',
          articles: docs
        });
    });
});

app.get('/blog/new', function(req, res) {
    res.render('blog_new.jade', { 
        title: 'New Post'
    });
});

app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/');
    });
});


app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port 3000");
});
