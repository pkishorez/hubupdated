import * as io from 'socket.io-client';

// Setup socket and return socket.
let Socket = io();
let username;
Socket.emit("setUsername", username=prompt("Enter your name."));
Socket.on("setUsername", function(error) {
	username = prompt("Invalid : "+error+". Enter another one : ");
	Socket.emit("setUsername", username);
});
export {
	username,
	Socket
};