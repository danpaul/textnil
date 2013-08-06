//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var mongoose = require('mongoose');
	// _ = require('underscore'),
	// async = require('async');
var config = require('../config');

var Post = require(config.models.post).model;
var PostNode = require(config.models.postNode).model;


var foo = {};
foo.bar = 'baz';

var storySchema = mongoose.Schema
({
	author: {type: mongoose.Schema.Types.ObjectId},
	root: {type: mongoose.Schema.Types.ObjectId, default: null}
});

storySchema.methods.insert = function(parentNode, childPost, callback)
{
	var postNode = new PostNode();
	postNode.parent = parentNode._id;
	postNode.post = childPost._id;
	postNode.story = this._id;
	postNode.depth = parentNode.depth + 1;
	postNode.save(callback);
}

storySchema.methods.link = function(parentNode, childNode, callback)
{
	var postNode = new PostNode();
	postNode.parent = parentNode._id;
	postNode.post = childNode.post._id;
	postNode.story = this._id;
	postNode.depth = parentNode.depth + 1;
	postNode.save(callback);
}

storySchema.methods.buildTree = function(startNode)
{
	var searchDepth = Infinity;
	var currentDepth = 0;
	var tree = {}
	tree.child = startNode._id;

	if(arguments.length === 3)
	{
		searchDepth = arguments[1];
		var callback = arguments[2];
	}

//build array of nodes on current level
//iterate over each and add to tree
//determine if each is currently in the tree(keep track via an array or more effic. data structure?)
	//if they are, add them to the tree
	//else add to tree and add a reference to that tree node to an array of 'next children'
//request entire array simultainiously
	while(currentDepth < searchDepth)
	{
		//iterate over children
	}
}

var Story = exports.model = mongoose.model('story', storySchema);

