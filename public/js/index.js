const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

// setting customize speech recognition language 
recognition.lang = 'en-US';
recognition.interimResults = false;

let talkBtn = document.querySelector('button');

// adding event listener on talk button
talkBtn.addEventListener('click', () => {
	recognition.start();
}) 

recognition.addEventListener('result', (e) => {
	console.log(e, 'checking event');
})