//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

// console.log('post');

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