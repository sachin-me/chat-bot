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

app.get('/', (req, res) => {
	res.sendFile('index.html');
})