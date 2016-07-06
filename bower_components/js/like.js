(function () {
  var socket = io.connect("http://localhost:4000");

  $(document).ready(function () {
    $('#btn').click(function () {
      socket.emit('likedPresentation', { liked: true });
    });
  });
} ())
