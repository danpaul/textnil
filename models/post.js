//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var mongoose = require('mongoose'),
	_ = require('underscore'),
	async = require('async');


var config = require('../config');

var db = config.dbURI;

//------------------------------------------------------------------------------
// schema
//------------------------------------------------------------------------------


var postSchema = mongoose.Schema
({
	content: String,
	author: {type: mongoose.Schema.Types.ObjectId, index: true}
});

var PostModel = exports.model = mongoose.model('post', postSchema);

// postSchema.methods.saveAsChild = function(parentId, cb)
// {
// 	var self = this;

// 	async.series
// 	([
// 		function(callback)
// 		{
// 			self.parent = parentId;
// 			self.save(function(err, record)
// 			{
// 				if(err)
// 				{
// 					callback(err);
// 					return;
// 				}else{
// 					callback();
// 				}
// 			});
// 		},
// 		function(callback)
// 		{
// 			PostModel.findOne({_id: parentId}, function(err, record){
// 				if(err){console.log(err)
// 				}else{
// 					;
// 				}
// 			});
// 		}
// 	],
// 		function(err){if(err)throw(err)}
// 	);
// }