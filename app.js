p = console.log
pr = function(e,r){if(e){p(e)}else{p(r)}};

var mongoose = require('mongoose'),
	express = require('express');

var config = require('./config');
var app = exports.app = express();

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

//var author = require(config.model.author);

var Post = require(config.model.post).model;

var post = new Post({content: 'bar'});

var post2 = new Post({content: 'baz'});

post.save(function(err, record)
{
	if(err){console.log(err)
	}else{
		post.saveAsChild(record.id, function(err, record){

		});
	}
});

