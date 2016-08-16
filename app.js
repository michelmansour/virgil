var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/poem', function (req, res) {
  res.json([
      {
        id: 1,
        title: 'Poem A',
        author: 'Foo Bar',
        collection: 'Leaves of Trees'
      }, {
        id: 2,
        title: 'Poem B',
        author: 'Bobby Arnold',
        collection: 'Where the Sidewalk Starts'
      }
    ]);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
