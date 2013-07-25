var express = require('express');
var mongoose = require('mongoose');
var request = require('superagent');

var config = require('./config');

var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.title = 'textNIL';

function neoGetTest(req, res)
{
	request.post('http://localhost:7474/db/data/cypher')
	   .set({
	   	'Accept': 'application/json',
	   	'Content-Type': 'application/json'
	   })
	   .send({ query: "START n=node(18) RETURN n.name" })
	   .end(function(neoRes){res.send(neoRes.text)});
}

app.get('/neo', function (req, res) 
{
	neoGetTest(req, res);

});

app.get('*', function (req, res)
{
  res.render('index');
});

app.listen(3000);