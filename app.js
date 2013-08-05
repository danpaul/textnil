p = console.log
pr = function(e,r){if(e){p(e)}else{p(r)}};

var mongoose = require('mongoose'),
	_ = require('underscore'),
	async = require('async'),
	express = require('express'),
	assert = require('assert');

var config = require('./config');
var app = exports.app = express();

mongoose.connect(config.dbURI);

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.title = 'textNIL';

app.get('*', function (req, res)
{
  res.render('index');
});

app.listen(3000);

//--------------------------------------------------------------------------------
var models = require(config.models);

var story = new models.story.model();

story.insert();

var author = new models.author.model({userName: 'dan', email: 'foo@email.com'});

var rootPost = new models.post.model({content: 'foo'});

var story = new models.story.model();

var rootPostNode = new models.postNode.model();

var post02 = new models.post.model({content: 'bar'});

async.series
([
	//create user
	function(callback)
	{
		author.save(function(err, record)
		{
			if(err){throw err
			}else{
				assert.equal(record.userName, 'dan');
				assert.equal(record.email, 'foo@email.com');
				callback();
			}
		});
	},
	//create post
	function(callback)
	{
		rootPost.author = author._id;
		rootPost.save(function(err, record)
		{
			if(err){console.log(err)
			}else{
				assert.equal(record.author, author._id);
				assert.equal(record.content, 'foo');
				callback();
			}
		});
	},
	//create story root
	function(callback)
	{
		story.author = author._id;
		story.save(function(err, record)
		{
			if(err){throw err
			}else{
				assert.equal(record.author, story.author);
				callback();
			}
		})
	},
	//create root postNode
	function(callback)
	{
		rootPostNode.story = story._id;
		rootPostNode.post = rootPost._id;
		rootPostNode.depth = 0;
		rootPostNode.save(function(err, record)
		{
			if(err){throw err
			}else{
				assert.equal(record.story, story._id);
				assert.equal(record.post, rootPost._id);
				assert.equal(record.depth, 0);
				callback();
			}
		})
	},
	//update story's root node
	function(callback)
	{
		story.root = rootPostNode._id;
		story.save(function(err, record)
		{
			if(err){throw err
			}else{
				assert.equal(record.root, rootPostNode._id);
				callback();
			}
		})
	},
	//create new node
	function(callback)
	{
		post02.author = author._id;
		post02.save(function(err, record){
			if(err){throw err
			}else{callback()}
		});
	},
	//insert child into parent
	function(callback)
	{
	// 	story.insert(rootPost, post02, function(err, record){
	// 		callback();
	// 	});
	}

	//add nodes to story
], function(err){if(err) throw err})