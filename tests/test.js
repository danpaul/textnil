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
var post = require(config.modelsDirectory + '/post');

var author1 ={ userName: 'dan', email: 'email@foo.com'};
var author2 ={ userName: 'stan', email: 'email@bar.com'};
var author3 ={ userName: 'fran', email: 'email@bat.com'};

var matchRecord = { userName: 'dan'}

/*
content: String,
author: {type: mongoose.Schema.Types.ObjectId, index: true},
parent: mongoose.Schema.Types.ObjectId,
children: {type: [mongoose.Schema.Types.ObjectId]rue},
date: {type: Date, default: Date.now}
*/

var post1 = 
{
	content: 'this is some text'
	// author: null,
	// parent: null,
	// children: null
}


describe('author', function()
{
	it('should save', function(done)
	{
		author.model(author1).save(function(err, record)
		{
			if(err) throw err;
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
			done();
		})
	});

	it('should find by userName', function(done)
	{
		author.model.findOne({userName: 'dan'}).exec(function(err, record)
		{
			if(err) throw err;
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
			done();
		})
	});

	it('should find by email', function(done)
	{
		author.model.findOne({email: 'email@foo.com'}).exec(function(err, record)
		{
			if(err) throw err;
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
			done();
		});
	});
})


describe('post', function()
{
	it('should save', function(done)
	{
		author.model.findOne({userName: 'dan'}).exec(function(err, record)
		{
			if(err) throw err;
			post1.author = record.id;
			post.model(post1).save(function(err, record){
				if(err) throw err;
				done();
			});
		})
	});

	it('should findOne', function(done)
	{
		post.model.findOne(function(err, record)
		{
			if(err){throw err;
			}else{
				if(!record.content === post1.content){throw err;}
				//console.log(record);
				done();
			}
		});
	});

	it('should save as child')
	{
		post.model.saveAsChild();
	}
});