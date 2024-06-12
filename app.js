document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".talk");
  const content = document.querySelector(".content");

  function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
  }

  function weather(location) {
    const weatherCont = document.querySelectorAll(".temp *");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        weatherCont[0].textContent = `Location : ${data.name}`;
        weatherCont[1].textContent = `Country : ${data.sys.country}`;
        weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
        weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
        weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherCont[5].textContent = `Original Temperature : ${ktc(
          data.main.temp
        )}`;
        weatherCont[6].textContent = `Feels like ${ktc(data.main.feels_like)}`;
        weatherCont[7].textContent = `Min temperature ${ktc(
          data.main.temp_min
        )}`;
        weatherCont[8].textContent = `Max temperature ${ktc(
          data.main.temp_max
        )}`;
        const weatherStatement = `Sir, the weather in ${data.name} is ${
          data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
        speak(weatherStatement);
      } else {
        weatherCont[0].textContent = "Weather Info Not Found";
      }
    };
    xhr.send();
  }

  function ktc(k) {
    return (k - 273.15).toFixed(2);
  }

  function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
      speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
      speak("Good Afternoon Master...");
    } else if (hour >= 17 && hour < 19) {
      speak("Good Evening Sir...");
    } else {
      speak("Good Night Sir...");
    }
  }

  // Initialize the application
  speak("Initializing JARVIS...");
  wishMe();
  weather("PUNE");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
  };

  btn.addEventListener("click", () => {
    content.textContent = "Listening...";
    recognition.start();
  });

  function updateTime() {
    const currentTimeElement = document.getElementById("current-time");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Initial call to display the time immediately
  updateTime();
  // Update the time every second
  setInterval(updateTime, 1000);

  function takeCommand(message) {
    if (message.includes("hey") || message.includes("hello")) {
      speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (
      message.includes("what is") ||
      message.includes("who is") ||
      message.includes("what are")
    ) {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText =
        "This is what I found on the internet regarding " + message;
      speak(finalText);
    } else if (message.includes("wikipedia")) {
      window.open(
        `https://en.wikipedia.org/wiki/${message
          .replace("wikipedia", "")
          .trim()}`,
        "_blank"
      );
      const finalText =
        "This is what I found on Wikipedia regarding " + message;
      speak(finalText);
    } else if (message.includes("time")) {
      const time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      const finalText = "The current time is " + time;
      speak(finalText);
    } else if (message.includes("date")) {
      const date = new Date().toLocaleString(undefined, {
        month: "short",
        day: "numeric",
      });
      const finalText = "Today's date is " + date;
      speak(finalText);
    } else if (message.includes("calculator")) {
      window.open("Calculator:///");
      const finalText = "Opening Calculator";
      speak(finalText);
    } else {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText =
        "I found some information for " + message + " on Google";
      speak(finalText);
    }
    if (message.includes("play for")) {
      speak("Here's the result");
      const input = message.split(" ").slice(2).join("+");
      window.open(`https://www.youtube.com/results?search_query=${input}`);
    }

    if (message.includes("open linkedin profile")) {
      speak("Opening LinkedIn profile sir");
      window.open("https://www.linkedin.com/in/vishwajeet-ranaware-859973228/");
    }
  }
});
