const express = require('express');
const socketIO = require('socket.io');

// process.env.PORT is related to deploying on heroku
// 3000 is an arbitrary port number - we could have taken any (not well-known) port. 5000 works!

const PORT = process.env.PORT || 3000;

// express() is a function, we store it in a variable called app
const app = express();

// Set up the server
// we ask the "app" to start listening for requests (we're setting up the HTTP server). The listen() function has two parameters: 1) the port number (PORT), 2) a callback function (listenInfo)

const server = app.listen(PORT, listenInfo);

// This call back just tells us that the server has started
function listenInfo() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// When app receives an HTTP request, it responds with static files contained in the public folder
app.use(express.static('public'));

// // WebSocket Portion
// // WebSockets work with the HTTP server
const io = require('socket.io')(server);

// // Register a callback function to run when we have an individual connection
// // This is run for each individual user that connects
io.sockets.on('connection', (socket) => {

  // We are given a websocket object in our function
  console.log("We have a new client: " + socket.id);

  socket.on('trigger-click-card', (data) => {
    console.log("Received: " + data.word + " from client " + socket.id);

    // message is rebroadcasted to all clients including sender
    io.sockets.emit('click-card', data);

    // If we want to send the message to all other clients but not the sender, use:
    //     socket.broadcast.emit('click-card', data);
  })



  socket.on('disconnect', () => {
    console.log("Client has disconnected");
  });
});
