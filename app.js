var express = require('express');
var mongoose = require('mongoose');

var textNil = express();
textNil.use(express.bodyParser());
textNil.use(express.static(__dirname + '/public'));
textNil.set('views', __dirname + '/views');
textNil.set('view engine', 'jade');
textNil.locals.title = 'textNIL';

mongoose.connect('mongodb://localhost/test');
var textNilPostSchema = ({title: String, text: String});
var textNilPost = mongoose.model('Post', textNilPostSchema);

textNil.post('/api/post', function (req, res) {
	var newPost = new textNilPost(req.body);
	newPost.save(function(error) {
		if(error){
			console.log("error saving post");
		}else{
			console.log("success");
		}
	})
	//console.log(req.body);
	res.send(200);
})

textNil.get('*', function (req, res) {
  res.render('index');
})

textNil.listen(3000);