var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');
var POEMS_FILE = path.join(__dirname, 'poems.json');

app.use('/', express.static(path.join(__dirname, 'client/public')));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

let commentFilter = (poemId) => (comment) => comment.poemId === parseInt(poemId);

app.get('/api/comments/:poemId', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let comments = JSON.parse(data);
    let poemComments = comments.filter(commentFilter(req.params.poemId));
    res.json(poemComments);
  });
});

app.post('/api/comments/:poemId', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),
      poemId: parseInt(req.params.poemId),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      let poemComments = comments.filter(commentFilter(req.params.poemId));
      res.json(poemComments);
    });
  });
});

app.get('/api/poem', (req, res) => {
  fs.readFile(POEMS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/poem', function (req, res) {
  if (req.body.poems && Array.isArray(req.body.poems)) {
    let poems = req.body.poems;
    fs.writeFile(POEMS_FILE, JSON.stringify(poems, null, 4), (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(poems);
    });
  } else {
    fs.readFile(POEMS_FILE, (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      let poems = JSON.parse(data);
      let newPoem = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        collection: req.body.collection,
        text: req.body.text
      };
      poems.push(newPoem);
      fs.writeFile(POEMS_FILE, JSON.stringify(poems, null, 4), (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(poems);
      });
    });
  }
});

app.listen(3000, function () {
  console.log('Server started and listening on port 3000!');
});
