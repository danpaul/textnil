/*

	Note: main front-end app is in niltext repo

*/


var mongoose = require('mongoose'),
	_ = require('underscore'),
 	async = require('async'),
 	express = require('express'),
 	engine = require('ejs-locals');

var app = exports.app = express();
var textNil = require(__dirname + '/textNil');

var config = require('./config');
var controller = config.controllers;
var storyController = require(config.controllers.story);
var postNodeController = require(config.controllers.postNode);
var postController = require(config.controllers.post);

mongoose.connect(config.dbURI);

app.engine('ejs', engine);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.locals.title = 'textNIL';


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader('Content-Type', 'application/json');
  next();
 });


app.get('/api/test', function (req, res)
{
	res.send('foo');
});

app.get('/api/story/find', function (req, res)
{
	storyController.find(textNil.responseCallback(res));
});

app.get('/api/story/find-by-id/:id', function (req, res)
{
// console.log(req.query);
	storyController.findById(req.params.id, textNil.responseCallback(res));
});

app.get('/api/story/find-one', function (req, res)
{
	storyController.findOne(textNil.responseCallback(res));
});
/*
	Takes a story id.
	Returns an object two properties (`tree` and `data`). `tree` defines the
	hierachical structure of the story and its nods. `data` contains the 
*/
app.get('/api/story/:id', function (req, res)
{
	storyController.getStoryTreeWithPosts(req.params.id, textNil.responseCallback(res));
});

app.get('/api/node/:id', function (req, res)
{
	storyController.getTreeFromPostId(req.params.id, textNil.responseCallback(res));
});

app.get('/api/post/find-one', function (req, res)
{
	postController.findOne(textNil.responseCallback(res));
});

app.get('/api/post/:id', function (req, res)
{
	postController.findById(req.params.id, textNil.responseCallback(res));
});

app.get('/api/posts', function (req, res)
{
	postController.getPosts(req.query.ids, textNil.responseCallback(res));
});

app.get('/api/post-node/find', function (req, res)
{
	postNodeController.find(textNil.responseCallback(res));
});

//51ff071a34c070a644000005
app.get('/api/post-node/:id', function (req, res)
{
	postNodeController.findById(req.params.id, textNil.responseCallback(res));
});

app.get('/api/post-node-children/:id', function(req, res){
	postNodeController.getChildren(req.params.id, textNil.responseCallback(res));
});

app.get('/api/post-nodes', function (req, res)
{
	postNodeController.getPostNodes(req.query.ids, textNil.responseCallback(res));
});




app.post('/api/node', function (req, res)
{
	postNodeController.insertNewPost(req.body);

//console.log(req.body);

	res.send('success');
	// storyController.getTreeFromPostId(req.params.id, function(err, tree)
	// {
	// 	if(err){console.log(err);
	// 	}else{
	// 		res.send(tree);
	// 	}
	// });
});

app.get('*', function (req, res)
{
  res.render('index');
});

app.listen(3000);