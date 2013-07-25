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

var urlBase = 'http://localhost:7474/db/data/cypher';

var requestParameters = 
{
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

function neoMakeRequest(query, callback)
{
	request.post(urlBase)
	   .set(requestParameters)
	   .send(query)
	   .end(callback)
	   	//function(neoRes){res.send(neoRes.text)});
}

function neoCreateNode(req, res)
{

}

app.get('/neo', function (req, res) 
{
	neoMakeRequest({ query: "START n=node(18) RETURN n.name" }, function(err, neoRes)
	{
		if(err){console.log(err);}
		else{res.send(neoRes.text);}
	})
});

app.get('*', function (req, res)
{
  res.render('index');
});

app.listen(3000);