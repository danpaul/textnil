p = console.log

//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var mongoose = require('mongoose'),
	_ = require('underscore'),
	async = require('async');

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
	new PostNode({
		parent: parentNode._id,
		post: childPost._id,
		story: this._id,
		depth: parentNode.depth + 1
	}).save(callback);
}

storySchema.methods.link = function(parentNode, childNode, callback)
{
	new PostNode
	({
		parent: parentNode._id,
		post: childNode.post,
		story: this._id,
		depth: parentNode.depth + 1
	}).save(callback);
}


//can have the following signature (if the second, there is no depth limit):
//	buildTree(startNode, depth, callback)
//	buildTree(startNode, callback)
storySchema.methods.buildTree = function(startNode, callback)
{
	var self = this;
	var searchDepth = Infinity;
	var currentDepth = 0;
	var callback = arguments[1];
	
	if(arguments.length === 3)
	{
		searchDepth = arguments[1];
		var callback = arguments[2];
	}

	function makeTreeNode(nodeId)
	{
		return(
		{
			self: nodeId,
			children: []
		});
	}


	function setNodeChildren(treeNode)
	{
		//var children = [];
		async.series
		([
			function(callback)
			{
	//console.log(treeNode);
				PostNode.find({story: self._id, parent: treeNode.self}, function(err, records)
				{
					if(err){console.log(err); callback();
					}else{
						_.each(records, function(record)
						{
							treeNode.children.push(makeTreeNode(record._id));
						})
						callback();
					}
				});
			},
			function(callback)
			{
				async.forEach
				callback();
			}
		],
		function(callback)
		{
console.log(treeNode);
		});
		//return children;
	}

	var root = makeTreeNode(startNode._id);

	setNodeChildren(root);



 	callback();

//build array of nodes on current level
//iterate over each and add to tree
//determine if each is currently in the tree(keep track via an array or more effic. data structure?)
	//if they are, add them to the tree
	//else add to tree and add a reference to that tree node to an array of 'next children'
//request entire array simultainiously
	// while(currentDepth < searchDepth)
	// {
	// 	//iterate over children
	// }
	// Post.findOne(function(e,r){
	// 	console.log(r);
	// 	callback();
	// })

}

var Story = exports.model = mongoose.model('story', storySchema);

