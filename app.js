var mongoose = require('mongoose'),
	_ = require('underscore'),
 	async = require('async'),
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