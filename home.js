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


document.querySelectorAll('.image-container').forEach(container =>{
  container.addEventListener('click',function(){
    const link = this.getAttribute('data-link');
    if(link){
      window.location.href = link;
    }
  });
});

function applyAnimation() {
  const elements = document.querySelectorAll('.flag-color');
  elements.forEach(el => {
      el.style.animation = 'colorCycle 5s infinite'; 
  });
}

applyAnimation();