var _ = require('underscore'),
	async = require('async');

var Story = require(config.models.story).model;
var Post = require(config.models.post).model;
var PostNode = require(config.models.postNode).model;

/*
	Builds a tree of postNodes starting from story's root to depth specified in 
		`config.defaultsearchDepth`.
*/
exports.getTreeFromStoryId = function(storyId, callback)
{
	Story.findOne({'_id': storyId}, function(err, story)
	{
		PostNode.findOne({'_id': story.root}, function(err, postNode)
		{
			if(err){console.log(err)
			}else{
				Story.buildTree(postNode, function(err, tree)
				{
					callback(err, tree);
				})
			}
		});
	});
}

exports.getTreePosts = function(tree, callback)
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