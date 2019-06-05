
const socket = io();

const you = document.querySelector('.you');
const bot = document.querySelector('.bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

// setting customize speech recognition language 
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let talkBtn = document.querySelector('button');

// adding event listener on talk button
talkBtn.addEventListener('click', () => {
	recognition.start();
}) 

recognition.addEventListener('speechstart', () => {
	console.log('Speech has been started');
})

recognition.addEventListener('result', (e) => {
	console.log('Result has been detected');
	let last = e.results.length - 1;
	let text = e.results[last][0].transcript;

	you.textContent = text;
	console.log('Confidence: ', e.results[0][0].confidence);
	socket.emit('chat message', text);
})

recognition.addEventListener('speechend', () => {
	recognition.stop();
})

recognition.addEventListener('error', (e) => {
	bot.textContent = `Error: ${e.error}`; 
})

function synthVoice(text) {
	const synth = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance();
	utterance.text = text;
	synth.speak(utterance);
}

socket.on('bot reply', (replyText) => {
	synthVoice(replyText);

	if (replyText == '') replyText = 'No Answer...';
	bot.textContent = replyText;
})