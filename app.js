p = console.log

var mongoose = require('mongoose');
var express = require('express');
var config = require('./config');
var app = express();

mongoose.connect(config.dbURI);

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.title = 'textNIL';

app.get('*', function (req, res)
{
  res.render('index');
});

app.listen(3000);

//--------------------------------------------------------------------------------
// Testing

//p(config);
// var post = require(config.modelsDirectory + '/post');
var author = require(config.modelsDirectory + '/author');

var dan ={ userName: 'dan', email: 'email@foo.com'};

author.create(dan, function(err, record){
	if(err){console.log(err);
	}else{console.log('success');}
});

author.update({userName: 'dan'}, {email: 'bar@bar.com'}, function(err, record){
	if(err){console.log(err);
	}else{console.log('success2');}
});

author.read({userName: 'dan'}, function(err, record)
{
	if(err){console.log(err);
	}else{console.log(record[0]._id);}
});

var foo = 'foo';