//--------------------------------------------------------------------------------------

p = console.log
var config = require('../config');
var mongoose = require('mongoose');
var assert = require('assert');

mongoose.connect(config.dbURI);

//--------------------------------------------------------------------------------------
// Data

//var post = require(config.modelsDirectory + '/post');
var author = require(config.modelsDirectory + '/author');

var author1 ={ userName: 'dan', email: 'email@foo.com'};
var author2 ={ userName: 'stan', email: 'email@bar.com'};
var author3 ={ userName: 'fran', email: 'email@bat.com'};

var matchRecord = { userName: 'dan'}


describe('author', function()
{
	it(' should save', function(done)
	{
		author.model(author1).save(function(err, record)
		{
			if(err) throw err;
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
			done();
		})
	});

	it(' should find by userName', function(done)
	{
		author.model.findOne({userName: 'dan'}).exec(function(err, record)
		{
			if(err) throw err;
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
			done();
		})
	});

	it(' should find by email', function(done)
	{
		author.model.findOne({email: 'email@foo.com'}).exec(function(err, record)
		{
			if(err) throw err;
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
			done();
		})
	});

	after(function(done)
	{
		mongoose.connection.close();
		done();
	});
})


//  exports.create = function(authorObject, callback)
// {
// 	new authorModel(authorObject).save(callback);
// }

// //passes an array of matches
// exports.findAll = function(queryObject, callback)
// {
// 	authorModel.find(queryObject).exec(callback);
// }

// exports.deleteAll = function(queryObject, callback)
// {
// 	authorModel.find(queryObject).remove(callback);
// }

// exports.updateAll = function(queryObject, updateObject, callback)
// {
// 	authorModel.update(queryObject, updateObject, callback);
// }

