var mongoose = require('mongoose'),
	_ = require('underscore'),
 	async = require('async'),
 	express = require('express'),
 	engine = require('ejs-locals');

var app = exports.app = express();

var config = require('./config');
var controller = config.controllers;

mongoose.connect(config.dbURI);

app.engine('ejs', engine);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.locals.title = 'textNIL';

app.post('/addnode', function (req, res)
{
console.log(req.body.text);
  res.send('in post');
});

app.get('/story/:id', function (req, res)
{
  //require(controller.story).getStory(req, res, req.params.id);
  var testId = '520e73b7c6b390016f000003';
  require(controller.story).getStory(req, res, testId);
});

app.get('*', function (req, res)
{
  res.render('index');
});

var testId = '520e73b7c6b390016f000003';
require(config.controllers.story).getStory(null, null, testId);

app.listen(3000);