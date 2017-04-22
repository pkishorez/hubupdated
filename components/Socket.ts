import * as io from 'socket.io-client';

// Setup socket and return socket.
let Socket = io();

let userName = localStorage.getItem("Name");

userName || localStorage.setItem('Name', userName = prompt("Please enter your name : "));

document.title = userName;

Socket.emit("setUsername", userName);
Socket.on("setUsername", function(error) {
	userName = prompt("Invalid : "+error+". Enter another one : ");
	localStorage.setItem('Name', userName);
	document.title = userName;
	Socket.emit("setUsername", userName);
});
export {
	userName,
	Socket
};