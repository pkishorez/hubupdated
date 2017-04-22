var app = require('express')();
var https = require('https');
var fs = require('fs');

var http = require('http');
let server = http.createServer(app).listen(80);

import * as SocketIO from 'socket.io';
let io = SocketIO.listen(server);

app.get('/', function(req, res){
	res.sendFile('index.html', {root: __dirname});
});

app.get('/bundle/:value', function(req, res){
	res.sendFile(req.params.value, {root: __dirname+"/bundle"});
});
app.get('/images/:value', function(req, res){
	res.sendFile(req.params.value, {root: __dirname+"/images"});
});

var messages = [];
var message_id = 0;
let users = [];

//Whenever someone connects this gets executed
io.on('connection', function(socket){

	var USER = null;

	socket.on("setUsername", function(name){
		if (users.indexOf(name)==-1){
			USER = name;
			users.push(USER);
			socket.emit('online', users);
		}
		else {
			socket.emit("setUsername", "name already exist");
		}
	});

	socket.on('disconnect', function () {
		users = users.filter((user)=>{
			if (user==USER)
				return false;
			return true;
		})
		io.sockets.emit('online', {
			users
		});
	});
	socket.on("presentation", function(data) {
		io.sockets.emit("presentation", data);
	})
	socket.on('chat', function(data) {
		switch(data.action) {
			case 'messages': {
				socket.emit('chat', {
					action: 'messages',
					messages: messages
				});
				return;
			}
			case 'message': {
				data.key = (message_id++);
				messages.push(data);
				io.sockets.emit('chat', {
					action: 'message',
					message: data
				});
				return;
			}
			case 'reset': {
				messages = [];
				message_id = 0;
				io.sockets.emit('chat', {
					action: 'reset'
				});
			}
		}
	});
});