const io = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io('http://localhost:3000'); // Change to your server's URL if needed

// On connection, send a message
socket.on('connect', () => {
  console.log('Connected to server');
  
  // Send a message to the server
  socket.emit('message', { text: 'Hello from client!' });
});

// Listen for the server's response
socket.on('response', (data) => {
  console.log('Server response:', data);
});

// Listen for disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
