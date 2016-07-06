var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/monkeys', function (req, res, next) {
  res.sendFile(__dirname + '/monkeys.html');
});

server.listen(4000, function () {
  console.log('Listening on port 4000');
});

var likeCount = 0;


io.on('connection', function (client) {
  console.log('Someone connected');

  setInterval(function () {
    likeCount = 0;
    client.broadcast.emit('update', { count: likeCount });
  }, 10000);

  client.on('likedPresentation', function (data) {
    likeCount++;

    client.broadcast.emit('update', { count: likeCount });

    console.log(likeCount);
  });
});
