var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var POEMS_FILE = path.join(__dirname, 'poems.json');

app.use('/', express.static(path.join(__dirname, 'client/public')));
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

app.post('/api/poem', function (req, res) {
  fs.readFile(POEMS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var poems = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPoem = {
      id: Date.now(),
      title: req.body.title,
      author: req.body.author,
      collection: req.body.collection,
      text: req.body.text
    };
    poems.push(newPoem);
    fs.writeFile(POEMS_FILE, JSON.stringify(poems, null, 4), function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(poems);
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
