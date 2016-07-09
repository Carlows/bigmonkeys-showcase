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

app.get('/pepe', function (req, res, next) {
  res.sendFile(__dirname + '/monkeys.html');
});

server.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port 4000');
});

var likeCount = 0;
var totalCount = 0;
var interval;

io.on('connection', function (client) {
  console.log('Someone connected');

  if(interval == undefined) {
    interval = setInterval(function () {
      likeCount = 0;
      client.broadcast.emit('update', { count: likeCount });
    }, 20000);
  }

  client.on('likedPresentation', function (data) {
    likeCount++;
    totalCount++;

    client.broadcast.emit('update', { count: likeCount, total: totalCount });
  });
});
