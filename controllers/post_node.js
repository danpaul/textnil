var Post = require(config.models.post).model;
var PostNode = require(config.models.postNode).model;

/*
	Inserts new `postNode` into story and calls `callback` with two arguments
		(error, record).
	`nodeObject` should conaint the following properties:
		`post`: text of new post
		`postNodeID`: id of the parent `postNode`. The new post will be a child
			of the parent.
		`storyId`: id of the story the post belongs to.
*/

var insertNewPost = exports.insertNewPost = function(nodeObject, callback)
{
	//create a new post
	Post.create({content: nodeObject.content, author: nodeObject.author}, function(err, post){
		if(err){console.log(err)
		}else{
			//create new `postNode`
			PostNode.create(
			{
				post: post._id,
				parent: nodeObject.postNodeId,
				story: nodeObject.storyId
			},function(err, record)
			{
				if(err){ callback(err);
				}else{
					callback(null, record)
				}
			})
		}
	});
}

var find = exports.find = function(callback){
	PostNode.find({}, callback);
}

var findOne = exports.findOne = function(callback)
{
	PostNode.findOne({}, callback);
}

var findById = exports.findById = function(id, callback){
	PostNode.findById(id, callback);
}

var findPostNode = exports.findPostNode = function(callback){
	PostNode.find({}, callback);
}

var getPostNodes = exports.getPostNodes = function(ids, callback){
	PostNode.find({'_id':{ $in: ids }}, callback);
}

var getPostNodeChildren = exports.getChildren = function(parentId, callback){
	PostNode.find({parent: parentId}, callback);
}