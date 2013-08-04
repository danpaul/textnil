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


var postNodeSchema = mongoose.Schema
({
	story: {type: mongoose.Schema.Types.ObjectId, default: null},
	parent: {type: mongoose.Schema.Types.ObjectId, default: null},
	child: {type: mongoose.Schema.Types.ObjectId, default: null},
	post: {type: mongoose.Schema.Types.ObjectId, index: true},
	depth: {type: Number, index: true}
}).index({story: 1, parent: 1});

postNodeSchema.methods.addChildPost = function(parentNode, childPost)
{
	async.series
	([
		function(callback)
		{
			callback();
		}

		//add nodes to story
	], function(err){if(err) throw err})
}

var PostNode = exports.model = mongoose.model('post_node', postNodeSchema);