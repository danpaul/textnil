var mongoose = require('mongoose'),
	_ = require('underscore'),
 	async = require('async'),
 	express = require('express'),
 	engine = require('ejs-locals');

var config = require('./config');
var app = exports.app = express();

mongoose.connect(config.dbURI);

app.engine('ejs', engine);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.locals.title = 'textNIL';

app.get('*', function (req, res)
{
  res.render('index');
});

app.post('/addnode', function (req, res)
{
//console.log(req.query);
console.log(req.body.text);
  res.send('in post');
});

app.listen(3000);