(function () {
  var socket = io.connect("http://localhost:4000");

  socket.on('connect', function (data) {
    var msg = 'hi';
    socket.emit('join', msg);
  });

  socket.on('update', function (data) {
    $('#likecounter').html(data.total);

    if(data.count > 5) {
      $('.pepecontainer').html('<img src="happypepe.webp" alt="happypepe" class="pepe" />');
    } else {
      $('.pepecontainer').html('<img src="sadpepe.webp" alt="sadpepe" class="pepe" />');
    }
  });
} ())
