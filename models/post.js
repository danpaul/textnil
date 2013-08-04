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
	author: {type: mongoose.Schema.Types.ObjectId, index: true, default: null},
	parent: {type: mongoose.Schema.Types.ObjectId, default: null},
	children: {type: [mongoose.Schema.Types.ObjectId], index: true, default: []},
	date: {type: Date, default: Date.now}
});

//animalSchema.methods.findSimilarTypes

postSchema.statics.foo = function(){console.log('foo');}

postSchema.methods.saveAsChild = function(parentId)
{
	asyn.series
	([
		this.save(function(err, record)
		{
			p('foo');
		});
	]);
	// 	}
	// ]);
	//save child
	//append child to parent if not already saved
	//get parent id
	//find parent
	//add child to child
	//return foo;
}

var postModel = exports.model = mongoose.model(config.postModelName, postSchema);