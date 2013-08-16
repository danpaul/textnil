var _ = require('underscore'),
	async = require('async');

var Story = require(config.models.story).model;


//Sotory.find({story: self._id, parent: treeNode.self});

//builds a story tree which contains a tree of post_node ids
exports.getStory = function(req, res, storyId)
{
	Story.findOne({'_id': storyId}, function(err, story)
	{
console.log(story);
		if(err){ console.log(err); 
		}else{
			//var root = record.root;
			story.buildTree(story.root, function(err, record)
			{
				if(err){ console.log(err)
				}else{
console.log(record);
					res.send(record)
				}
			})
		}
	});
}

