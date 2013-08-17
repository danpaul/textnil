var _ = require('underscore'),
	async = require('async');

var Story = require(config.models.story).model;
var Post = require(config.models.post).model;
var PostNode = require(config.models.postNode).model;

//Sotory.find({story: self._id, parent: treeNode.self});

//builds a story tree which contains a tree of post_node ids
exports.getStory = function(req, res, storyId)
{
	Story.findOne({'_id': storyId}, function(err, story)
	{
		if(err){ console.log(err); 
		}else{
			story.buildTree(story.root, function(err, record)
			{
				if(err){ console.log(err)
				}else{
					var postIds = [];
					Story.traverseTree(record, function(err, record)
					{
						if(err){console.log(err);
						}else{
							postIds.push(record);
						}
					});
//console.log(postIds);
					PostNode.where('_id').in(postIds).exec(function(err, r)
					{
//						console.log(r);
					});

//					console.log(postIds);
				}
			})
		}
	});
}

