//example of a successful api request to neo

var request = require('superagent');

request.post('http://localhost:7474/db/data/cypher')
	   .set({
	   	'Accept': 'application/json',
	   	'Content-Type': 'application/json'
	   })
	   .send({	query: "START n=node(18) RETURN n.name" })
	   .end(function(res){console.log(res.text)});