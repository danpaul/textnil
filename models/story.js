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


var storySchema = mongoose.Schema
({
	author: {type: mongoose.Schema.Types.ObjectId},
	root: {type: mongoose.Schema.Types.ObjectId, default: null}
});

var Story = exports.model = mongoose.model('story', storySchema);