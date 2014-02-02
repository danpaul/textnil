var Post = require(config.models.post).model;


var findOne = exports.findOne = function(callback)
{
	Post.findOne({}, callback);	
}

var findById = exports.findById = function(id, callback){
	Post.findById(id, callback);
}