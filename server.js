const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const POEMS_FILE = path.join(__dirname, 'poems.json');

app.use('/', express.static(path.join(__dirname, 'client/public')));
app.use(bodyParser.json());

const commentFilter = (poemId) => (comment) => comment.poemId === parseInt(poemId, 10);

app.get('/api/comments/:poemId', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const comments = JSON.parse(data);
    const poemComments = comments.filter(commentFilter(req.params.poemId));
    res.json(poemComments);
  });
});

app.post('/api/comments/:poemId', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const comments = JSON.parse(data);
    const newComment = {
      id: Date.now(),
      poemId: parseInt(req.params.poemId, 10),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        process.exit(1);
      }
      const poemComments = comments.filter(commentFilter(req.params.poemId));
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

app.get('/api/poem/:poemId', (req, res) => {
  fs.readFile(POEMS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const poems = JSON.parse(data);
    const targetPoem = poems.filter((poem) => poem.id === parseInt(req.params.poemId, 10))[0];
    res.json(targetPoem);
  });
});

app.post('/api/poem', (req, res) => {
  if (req.body.poems && Array.isArray(req.body.poems)) {
    const poems = req.body.poems;
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
      const poems = JSON.parse(data);
      const newPoem = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        collection: req.body.collection,
        text: req.body.text,
      };
      poems.push(newPoem);
      fs.writeFile(POEMS_FILE, JSON.stringify(poems, null, 4), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          process.exit(1);
        }
        res.json(poems);
      });
    });
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/public/index.html'));
});

app.listen(3000, () => {
  console.log('Server started and listening on port 3000!'); // eslint-disable-line no-console
});
