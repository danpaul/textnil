//--------------------------------------------------------------------------------------

p = console.log
var config = require('../config');
var mongoose = require('mongoose');
var assert = require('assert');

mongoose.connect(config.dbURI);

//--------------------------------------------------------------------------------------
// Data

var post = require(config.modelsDirectory + '/post');
var author = require(config.modelsDirectory + '/author');


//create an array of tests that all return true, if they return true tests pass, no need to worry about complicated framework

var dan ={ userName: 'dan', email: 'email@foo.com'};

var tests = 
[
	function()
	{
p('foo');
		author.create(dan, function(err, record){
			return('failed to save');
		});
//	if(err){console.log(err);
//	}else{console.log('success');}
	}
]

function nextTest(message)
{
	var currentTest = 0;
	if(message === undefined || message === true)
	{
		currentTest += 1;
		if(currentTest <= tests.length)
		{
			tests[i-1]();
		}else{
			p('victory is yours!');
		}
	}

}


for(var i = 0; i < tests.length; i++)
{
	var result = tests[i]();
	if(result !== true)
	{
		p(result);
		i = tests.length;
	}
}



//var author1 ={ userName: 'dan', email: 'email@foo.com'};
//var author2 ={ userName: 'stan', email: 'email@bar.com'};
//var author3 ={ userName: 'fran', email: 'email@bat.com'};

// var author = require(config.modelsDirectory + '/author');

// var dan ={ userName: 'dan', email: 'email@foo.com'};

// author.create(dan, function(err, record){
// 	//assert.equal('f', 'b', 'foo');
// 	throw new Error("woops");
// 	if(err){console.log(err);
// 	}else{console.log('success');}
// });


// describe('author', function()
// {
// 	describe(' create()', function()
// 	{
// 		it(' should save without error', function()
// 		{
// 			//assert.equal(foo.length, 3);
// 			author.create(author1, function(err, record){
// 				if(true){assert.fail();}
// 				console.log("hello");
// 				assert.equal(record.userName, 'danff');
// 				done();
// 			})
// 		})
// 	})
// })

// describe('author', function (){
// 	describe('create()', function(){
// 		it('should save without an error', function(done){
// 			author.create(author1, function(err, record){
// 				if(err){throw err;}
// 			})
// 		})
// 	})
// })

// author.create(dan, function(err, record){
// 	if(err){console.log(err);
// 	}else{console.log('success');}
// });

// author.update({userName: 'dan'}, {email: 'bar@bar.com'}, function(err, record){
// 	if(err){console.log(err);
// 	}else{console.log('success2');}
// });

// author.read({userName: 'dan'}, function(err, record)
// {
// 	if(err){console.log(err);
// 	}else{console.log(record[0]._id);}
// });
