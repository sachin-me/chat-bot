
require('dotenv').config();
const APIAI_TOKEN = 'e3642b297a043d0b30a8a4f4f3f7d62a1ddef473';
const APIAI_SESSION_ID = 'd1b31d6105044cd7b30a78f053ce883891556201069';

const express = require('express');
const morgan = require('morgan');
const app = express();

const port = 5000;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/views')) // html
app.use(express.static(__dirname + '/public')) // css, js, images

const server = app.listen(port, () => {
	console.log(`server is running on ${port}`);
})

const io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log('A user connected');
})

const apiai = require('apiai')(APIAI_TOKEN);

// web ui
app.get('/', (req, res) => {
	res.sendFile('index.html');
})

io.on('connection', function(socket) {
	socket.on('chat message', (text) => {
		console.log(`message: ${text}`);

		// Getting reply from ai
		let apiaiReq = apiai.textRequest(text, {
			sessionId: APIAI_SESSION_ID
		})

		apiaiReq.on('response', (response) => {
			let aiText = response.result.fulfillment.speech;
			console.log(`Bot reply: ${aiText}`);

			socket.emit('bot reply', aiText);
		})

		apiaiReq.on('error', (error) => {
			console.log(`Getting error: ${error}`);
		})

		apiaiReq.end();
	})
})