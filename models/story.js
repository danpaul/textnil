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

//traverses tree and applies callback to to each node
storySchema.statics.traverseTree = traverseTree = function(tree, callbackIn)
{
	if(tree.self != undefined)
	{
//console.log(tree.self);
		callbackIn(null, tree.self);
		if(tree.children.length != 0)
		{
//console.log(tree.children);
			async.forEachSeries(tree.children, function(child, callback)
			{
				traverseTree(child, function(err, record){
					if(err)
					{
						callbackIn(err, null);
						callback();
					}else{
						callbackIn(null, record);
						callback();
					}
				});
			});
		}
	}
}

var buildTree = storySchema.methods.buildTree = function(startNodeId, callback)
{
	var self = this;
	var searchDepth = config.defaulSearchDepth;//Infinity;
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

	function buildNodeTree(treeNodeArray, depth, callback)
	{
		async.series
		([
			function(callback)
			{
				if(treeNodeArray === 0 || depth >= searchDepth)
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
								buildNodeTree(treeNode.children, depth + 1, callback);
							}
						});
					},function(){callback()});
				}
			}
		],

		function()
		{
			callback(null, root);
		});
	}

	var root = {self: startNodeId, children: []}
	var rootarray = [root];
	buildNodeTree(rootarray, 0, callback);
}

var Story = exports.model = mongoose.model('story', storySchema);