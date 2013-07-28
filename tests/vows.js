var p = console.log

var vows = require('vows'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	config = require('../config');

var author = require(config.modelsDirectory + '/author');

mongoose.connect(config.dbURI);

var author1 ={ userName: 'dan', email: 'email@foo.com'};
var matchRecord = { userName: 'dan'}
var author2 ={ userName: 'stan', email: 'email@bar.com'};
var author3 ={ userName: 'fran', email: 'email@bat.com'};

vows.describe('author').addBatch
({
	'author':
	{
		topic: function()
		{
			author.create(author1, this.callback);
		},
		'can save without error': function(err, record)
		{
			assert.isNull(err);
		},
		'can save record': function(err, record)
		{
			assert.equal(record.userName, 'dan');
			assert.equal(record.email, 'email@foo.com');
		},
		'after a successful save':
		{
			topic: function()
			{
				author.update(matchRecord, author2, this.callback);
			},
			'can update without error': function(err, record)
			{
p(record);
				assert.isNull(err);
			}
			// 'can update record': function(err, record)
			// {
			// 	assert.equal(record.userName, 'stan');
			// 	assert.equal(record.email, 'email@bar.com');
			// }
		}
	}
}).export(module);