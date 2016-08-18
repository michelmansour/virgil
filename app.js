var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var POEMS_FILE = path.join(__dirname, 'poems.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/poem', function (req, res) {
  fs.readFile(POEMS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
