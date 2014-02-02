/*

	Note: main front-end app is in public/textnil.js

*/


var mongoose = require('mongoose'),
	_ = require('underscore'),
 	async = require('async'),
 	express = require('express'),
 	engine = require('ejs-locals');

var app = exports.app = express();

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
  next();
 });


/*
	Takes a story id.
	Returns an object two properties (`tree` and `data`). `tree` defines the
	hierachical structure of the story and its nods. `data` contains the 
*/
app.get('/api/story/:id', function (req, res)
{
	storyController.getStoryTreeWithPosts(req.params.id, function(err, tree)
	{
		if(err){console.log(err);
		}else{
			res.send(tree);
		}
	});
});

app.get('/api/node/:id', function (req, res)
{
	storyController.getTreeFromPostId(req.params.id, function(err, tree)
	{
		if(err){console.log(err);
		}else{
			res.send(tree);
		}
	});
});

app.get('/api/post/find-one', function (req, res)
{
	postController.findOne(function(err, record)
	{
		if(err){console.log(err);
		}else{
			res.send(record);
		}
	})
});

app.get('/api/post/:id', function (req, res)
{
	postController.findById(req.params.id, function(err, record)
	{
		if(err){console.log(err);
		}else{
			res.setHeader('Content-Type', 'application/json');
			res.send(record);
		}
	})
});

app.get('/api/posts', function (req, res)
{

console.log(req.query.ids);

	postController.getPosts(req.query.ids, function(err, record)
	{
		if(err){console.log(err);
		}else{
			res.setHeader('Content-Type', 'application/json');
			res.send(record);
		}
	})
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