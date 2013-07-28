//------------------------------------------------------------------------------
// require/setup
//------------------------------------------------------------------------------

var config = require('../config');
var mongoose = require('mongoose');
var _ = require('underscore');
var db = config.dbURI;

var p = console.log

//------------------------------------------------------------------------------
// schema
//------------------------------------------------------------------------------


var authorSchema = mongoose.Schema
({
	userName: {type: String, index: true},
	email: {type: String, index: true}
});

var authorModel = exports.model = mongoose.model(config.authorSchemaName, authorSchema);

//------------------------------------------------------------------------------
// CRUD
//------------------------------------------------------------------------------

exports.create = function(authorObject, callback)
{
	new authorModel(authorObject).save(callback);
}

//passes an array of matches
exports.findAll = function(queryObject, callback)
{
	authorModel.find(queryObject).exec(callback);
}

exports.deleteAll = function(queryObject, callback)
{
	authorModel.find(queryObject).remove(callback);
}

exports.updateAll = function(queryObject, updateObject, callback)
{
	authorModel.update(queryObject, updateObject, callback);
}

exports.foo = "foo";