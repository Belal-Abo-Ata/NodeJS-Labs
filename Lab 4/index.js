//#region Variables & Constances
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//#endregion

//#region Functions & Events
app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
	io.on('connection', (socket) => {
		socket.on('chat message', (msg) => {
			io.emit('chat message', msg);
		});
	});
});

http.listen(3000, () => {
	console.log('Server running at http://localhost:3000');
});
//#endregion
