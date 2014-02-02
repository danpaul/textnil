var Post = require(config.models.post).model;


var findOne = exports.findOne = function(callback)
{
	//create a new post
	Post.findOne({}, callback);
	// function(err, record)
	// {
	// 	if(err){console.log(err);}
	// 	else{res.send(record);}
	// });
}