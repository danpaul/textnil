require('../app.js');

var config = require('../config');

var async = require('async'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	_ = require('underscore');

// mongoose.connect(config.dbURI);

var Post = require(config.models.post).model;
var Author = require(config.models.author).model;
var Story = require(config.models.story).model;
var PostNode = require(config.models.postNode).model;

var author = new Author({userName: 'dan', email: 'foo@email.com'});
var rootPost = new Post({content: 'foo'});
var story = new Story();
var rootPostNode = new PostNode();
var post02 = new Post({content: 'bar'});
var post03 = new Post({content: 'Lorem ipsum', author: author});

var childNode = new PostNode();
var childNode02 = new PostNode();

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
		story.insert(rootPostNode, post02, function(err, record){
			if(err){throw err
			}else{
				childNode = record;
				assert.equal(record.post, post02._id);
				assert.equal(record.depth, 1);
				assert.equal(record.parent, rootPostNode._id);
				assert.equal(record.story, story._id);
			}
			callback();
		});
	},
	//insert child into child
	function(callback)
	{
		post03.save(function(err, record)
		{
			if(err){throw err
			}else
			{
				var newPost = record;
				story.insert(childNode, record, function(err, record)
				{
					if(err){throw err
					}else{
						childNode02 = record;
						assert.equal(record.post, newPost._id);
						assert.equal(record.depth, 2);
						assert.equal(record.parent, childNode._id);
					}
					callback();
				});
			}
		})
	},
	//link nodes
	function(callback)
	{
		story.link(rootPostNode, childNode02, function(err, record)
		{
			if(err){throw err
			}else{
				assert.equal(record.post, childNode02.post);
				assert.equal(record.depth, 1);
				assert.equal(record.parent, rootPostNode._id);
			}
			callback();
		});
	},
	//get full node tree
	function(callback)
	{
console.log(story);
// console.log(story.root);
// console.log(rootPostNode);
		story.buildTree(story.root, function(err, record)
		{
			if(err){throw err
			}else{
//console.log(record);
				assert.equal(record.children.length, 2);
				_.each(record.children, function(child)
				{
					if(child.children.length > 0)
					{
						assert.equal(child.children[0].self.equals(childNode02._id), true);
					}
				})
			}
		});
	}
], function(err){if(err) throw err})