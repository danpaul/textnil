//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var mongoose = require('mongoose'),
	_ = require('underscore'),
	async = require('async');


var config = require('../config.js');
var models = require(config.models);

var foo = {};
foo.bar = 'baz';

var storySchema = mongoose.Schema
({
	author: {type: mongoose.Schema.Types.ObjectId},
	root: {type: mongoose.Schema.Types.ObjectId, default: null}
});

storySchema.methods.insert = function(){
	console.log(foo.bar);
	console.log(config.test.bar);
	console.log(models);
}

var Story = exports.model = mongoose.model('story', storySchema);

// var s = new Story;
// s.insert();