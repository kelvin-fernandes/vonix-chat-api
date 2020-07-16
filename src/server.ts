import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import moment from 'moment';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(3333, () => {
	console.log('Server started on port 3333')
});

io.on('connection', socket => {
	socket.on('user_joined', username => {
		socket.emit('bot_message', { username: 'Vonix Bot', content: 'Welcome to Vonix Chat', datetime: moment().format('HH:mm') })

		socket.broadcast.emit('bot_message', { username: "Vonix Bot", content: `${username} joined the chat`, datetime: moment().format('HH:mm') });
	});

	socket.on('new_chat_message', message => {
		socket.broadcast.emit('new_chat_message', message);
	})

	socket.on('user_disconnect', username => {
		socket.broadcast.emit('bot_message', { username: "Vonix Bot", content: `${username} has left the chat`, datetime: moment().format('HH:mm') });
	});
})

