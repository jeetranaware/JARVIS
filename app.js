// To take voice input through btn
const startbtn = document.querySelector("#start");
const stopbtn = document.querySelector("#stop");
const speakbtn = document.querySelector("#speak");

const SpeechRecognition =
  window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("vr active");
};

recognition.onend = function () {
  console.log("vr deactive");
};

recognition.continuous = true; // deactive auto off recording feature when we are not taking

startbtn.addEventListener("click", () => {
  recognition.start();
});

stopbtn.addEventListener("click", () => {
  recognition.stop();
});

//Make Jarvis speak
function readOut(message) {
  const speech = new SpeechSynthesisUtterance(); // API to readout message
  const allVoices = speechSynthesis.getVoices();
  speech.text = message;
  speech.voice = allVoices[5];
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("Speaking Out");
}

speakbtn.addEventListener("click", () => {
  readOut("Hi my name is Jarvis");
});
