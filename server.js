const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const POEMS_FILE = path.join(__dirname, 'poems.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const SESSIONS_FILE = path.join(__dirname, 'sessions.json');
const QUEUES_FILE = path.join(__dirname, 'queues.json');

app.use('/', express.static(path.join(__dirname, 'client/public')));
app.use(bodyParser.json());
app.use('/api', expressJwt({ secret: 'secret' }));

app.post('/login', (req, res) => {
  fs.readFile(USERS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
    }
    const users = JSON.parse(data);
    const targetUser = users.filter((user) => user.username === req.body.username)[0];

    if (!targetUser || targetUser.password !== req.body.password) {
      res.status(401).send('Bad login');
      return;
    }
    const token = jwt.sign(targetUser, 'secret', { expiresIn: '1h' });

    res.json({ token });
  });
});

const commentFilter = (poemId) => (comment) => comment.poemId === parseInt(poemId, 10);

app.get('/api/comments/:poemId', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
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
      res.status(500);
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
        res.status(500);
      }
      const poemComments = comments.filter(commentFilter(req.params.poemId));
      res.json(poemComments);
    });
  });
});

app.get('/api/session', (req, res) => {
  fs.readFile(SESSIONS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
    }
    res.json(JSON.parse(data).filter(s => s.userId === req.user.userId));
  });
});

function getNewSession(poems, userId) {
  return {
    id: Date.now(),
    userId,
    startDate: Date.now(),
    endDate: 0,
    status: 'ACTIVE',
    poems: poems || [],
  };
}

app.put('/api/session/', (req, res) => {
  fs.readFile(SESSIONS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
    }
    const sessions = JSON.parse(data);
    const sessionIdx = sessions.findIndex(s => s.userId === req.user.userId && s.status === 'ACTIVE');
    const paramSession = req.body.session;
    const updatedSession = sessions[sessionIdx];
    if (!paramSession.id) { // the previous session has been closed
      updatedSession.status = 'CLOSED';
      sessions.push(getNewSession(paramSession.poems, req.user.userId));
    } else { // the only other supported update is poems added or reordered
      updatedSession.poems = paramSession.poems;
    }
    fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 4), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        res.status(500);
      }
      res.json(updatedSession);
    });
  });
});

app.get('/api/queue', (req, res) => {
  fs.readFile(QUEUES_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
    }
    res.json(JSON.parse(data).filter(s => s.userId === req.user.userId));
  });
});

app.post('/api/queue', (req, res) => {
  if (req.body.queue && Array.isArray(req.body.queue)) {
    fs.readFile(QUEUES_FILE, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500);
      }
      const queues = JSON.parse(data);
      const queueIdx = queues.findIndex(q => q.userId === req.user.userId);
      queues[queueIdx].queue = req.body.queue;
      fs.writeFile(QUEUES_FILE, JSON.stringify(queues, null, 4), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          res.status(500);
        }
        res.json(req.body.queue);
      });
    });
  }
});

app.get('/api/poem', (req, res) => {
  fs.readFile(POEMS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/poem/:poemId', (req, res) => {
  fs.readFile(POEMS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
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
        console.error(`Writing poems array: ${err}`);
        res.status(500);
      }
      res.json(poems);
    });
  } else {
    fs.readFile(POEMS_FILE, (err, data) => {
      if (err) {
        console.error(`Reading poems: ${err}`);
        res.status(500);
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
          console.error(`Writing poem: ${writeErr}`);
          res.status(500);
        }
        // add the new poem to the user's queue
        fs.readFile(QUEUES_FILE, (queueErr, queueData) => {
          if (queueErr) {
            console.error(`Reading queue: ${queueErr}`);
            res.status(500);
          }
          const queues = JSON.parse(queueData);
          const queueIdx = queues.findIndex(q => q.userId === req.user.userId);
          queues[queueIdx].queue.push(newPoem.id);
          fs.writeFile(QUEUES_FILE, JSON.stringify(queues, null, 4), (queueWriteErr) => {
            if (queueWriteErr) {
              console.error(`Writing queue: ${queueWriteErr}`);
              res.status(500);
            }
            res.json(poems);
          });
        });
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
