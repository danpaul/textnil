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


var authorSchema = mongoose.Schema
({
	userName: {type: String, index: true},
	email: {type: String, index: true}
});

var authorModel = mongoose.model(config.authorSchemaName, authorSchema);

//------------------------------------------------------------------------------
// CRUD
//------------------------------------------------------------------------------

exports.create = function(authorObject, callback)
{
	new authorModel(authorObject).save(callback);
}

exports.read = function(queryObject, callback)
{
	authorModel.find(queryObject).exec(callback);
}