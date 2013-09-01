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
		callbackIn(null, tree.self);
		if(tree.children.length != 0)
		{
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

function makeTreeNode(node)
{
	return(
	{
		self: node,
		children: []
	});
}


/*
	`startNode` is a `PostNode` object. This function will build a tree of `PostNode`
		objects starting from `startNode` and then pass to a function that accepts
		2 arguments of the form `(err, record)` (standarnd mongoose signature). The
		tree is passed as the record.
	If 3 arguments are passed, the second argument will be the depth. If only 2 are 
		passed, the depth specified in the `config.js` will be searched.   
*/

var buildTree = storySchema.statics.buildTree = storySchema.methods.buildTree = function(startNode, callback)
{
	var self = this;
	var searchDepth = config.defaulSearchDepth;
	var currentDepth = 0;
	var callback = arguments[1];
	
	if(arguments.length === 3)
	{
		searchDepth = arguments[1];
		var callback = arguments[2];
	}

	function buildNodeTree(treeNodeArray, depth, callback)
	{
		async.series
		([
			function(callback)
			{
				if(treeNodeArray.length === 0 || depth >= searchDepth)
				{
					callback();
				}else{
					async.forEachSeries(treeNodeArray, function(treeNode, callback)
					{
						PostNode.find({story: treeNode.self.story, parent: treeNode.self._id}, function(err, records)
						{
							if(err){console.log(err); callback();
							}else{
								_.each(records, function(record)
								{
									treeNode.children.push(makeTreeNode(record));
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

	var root = {self: startNode, children: []}
	buildNodeTree([root], 0, callback);
}

var Story = exports.model = mongoose.model('story', storySchema);
