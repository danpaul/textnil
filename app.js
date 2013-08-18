var mongoose = require('mongoose'),
	_ = require('underscore'),
 	async = require('async'),
 	express = require('express'),
 	engine = require('ejs-locals');

var app = exports.app = express();

var config = require('./config');
var controller = config.controllers;
var storyController = require(config.controllers.story);

mongoose.connect(config.dbURI);

app.engine('ejs', engine);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.locals.title = 'textNIL';

app.post('/api/addnode', function (req, res)
{
console.log(req.body.text);
  res.send('in post');
});

app.get('/api/story/:id', function (req, res)
{

// console.log(req.params.id);
// res.send('foo');
//var testStoryId = '520fcf87eea1c9380d000003';

	storyController.getStoryTreeWithPosts(req.params.id, function(err, tree)
	{
		if(err){console.log(err);
		}else{
			res.send(tree);
		}
	});
});

app.get('*', function (req, res)
{
  res.render('index');
});



app.listen(3000);