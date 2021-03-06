//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var config = require('../config');

var mongoose = require('mongoose'),
	_ = require('underscore'),
	async = require('async');

var db = config.dbURI;

//------------------------------------------------------------------------------
// schema
//------------------------------------------------------------------------------

var authorSchema = mongoose.Schema
({
	userName: {type: String, index: true},
	email: {type: String, index: true}
});

var authorModel = exports.model = mongoose.model('author', authorSchema);