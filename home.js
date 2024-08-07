document.addEventListener('DOMContentLoaded',function(){
    const video = document.getElementById('bgv')
    video.playbackRate = 0.3; //slow down the video half speed
})


var header = document.getElementById("navigation");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}


const welcomeMessages = [
  "Welcome",
  "Selamat Datang",
  "欢迎",
  "வரவேற்பு",
  "أهلاً وسهلاً",
  "환영합니다",
  "いらっしゃいませ",
  "Bienvenido",
  "Willkommen",
  "Benvenuto",
  "Добро пожаловать",
];


const welcomeElement = document.getElementById('welcome-message');
let currentIndex = 0;

function changeWelcomeMessage() {
    currentIndex = (currentIndex + 1) % welcomeMessages.length;
    welcomeElement.style.opacity = 0; // Fade out
    setTimeout(() => {
        welcomeElement.textContent = welcomeMessages[currentIndex];
        welcomeElement.style.opacity = 1; // Fade in
    }, 1000); // Wait for fade out
}

setInterval(changeWelcomeMessage, 2000); // Change every 2 seconds