var express = require('express');
var app = express();

app.locals.title = 'textNIL'

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000);
/* console.log('Listening on port 3000'); */