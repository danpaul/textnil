//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var config = require('../config');
var mongoose = require('mongoose');
var _ = require('underscore');
var db = config.dbURI;

//------------------------------------------------------------------------------
// schema
//------------------------------------------------------------------------------


var postSchema = mongoose.Schema
({
	content: String,
	author: {type: mongoose.Schema.Types.ObjectId, index: true},
	parent: mongoose.Schema.Types.ObjectId,
	children: {type: [mongoose.Schema.Types.ObjectId], index: true},
	date: {type: Date, default: Date.now}
});

var postModel = exports.model = mongoose.model(config.postModelName, postSchema);