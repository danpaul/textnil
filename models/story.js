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

	function buildNodeTree(treeNodeArray, callback)
	{
		async.series
		([
			function(callback)
			{
				if(treeNodeArray === 0)
				{
					callback();
				}else{
					async.forEachSeries(treeNodeArray, function(treeNode, callback)
					{
						PostNode.find({story: self._id, parent: treeNode.self}, function(err, records)
						{
							if(err){console.log(err); callback();
							}else{
								_.each(records, function(record)
								{
									treeNode.children.push(makeTreeNode(record._id));
								})
								buildNodeTree(treeNode.children, callback);
							}
						});
					},function(){callback()});
				}
			}
		],
		function()
		{
			callback();//console.log(root);
		});
	}

	var root = makeTreeNode(startNode._id);
	var rootarray = [root];
	buildNodeTree(rootarray, function(){console.log(root)});

}

var Story = exports.model = mongoose.model('story', storySchema);