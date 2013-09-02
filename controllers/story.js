var _ = require('underscore'),
	async = require('async');

var Story = require(config.models.story).model;
var Post = require(config.models.post).model;
var PostNode = require(config.models.postNode).model;


/*
	Builds a tree of postNodes starting from story's root to depth specified in 
		`config.defaultsearchDepth`. Passes result to `callback(err, record)`.
*/
var getStoryTree = exports.getStoryTree = function(storyId, callback)
{
	Story.findOne({'_id': storyId}, function(err, story)
	{
		PostNode.findOne({'_id': story.root}, function(err, postNode)
		{
			if(err){callback(err);
			}else{
				getTree(postNode, callback);
			}
		});
	});
}

/*
	Builds a tree of postNodes starting from `startPostNode` to depth specified in 
		`config.defaultsearchDepth`. Passes result to `callback(err, record)`.
*/
var getTree = exports.getTree = function(startPostNode, callback)
{
	Story.buildTree(startPostNode, function(err, tree)
	{
		callback(err, tree);
	});
}

var getTreeFromPostId = exports.getTreeFromPostId = function(startPostNodeId, callback)
{
	PostNode.findOne({'_id': startPostNodeId}, function(err, postNode)
	{
		if(err){callback(err);
		}else{
			getTree(postNode, callback);
		}
	})
}

var getTreePosts = exports.getTreePosts = function(tree, callback)
{
	var postIds = [];
	Story.traverseTree(tree, function(err, record)
	{
		if(err){console.log(err);
		}else{
			postIds.push(record.post);
		}
	});
	Post.where('_id').in(postIds).exec(function(err, posts)
	{
		callback(err, posts);
	});
}

exports.getStoryTreeWithPosts = function(storyId, callback)
{
	var results = {};
	getStoryTree(storyId, function(err, tree)
	{
		if(err){callback(err)
		}else{
			results.tree = tree;
			getTreePosts(tree, function(err, data)
			{
				if(err){callback(err);
				}else{
					results.data = data;
					callback(null, results);
				}
			})
		}
	});
};