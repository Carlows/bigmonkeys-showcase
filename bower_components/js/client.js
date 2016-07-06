(function () {
  var socket = io.connect("http://localhost:4000");

  socket.on('connect', function (data) {
    var msg = 'hi';
    socket.emit('join', msg);
  });

  socket.on('update', function (data) {
    $('#likeCount').html(data.count);
  });
} ())
