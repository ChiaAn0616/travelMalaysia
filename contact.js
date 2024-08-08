document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Show a success message
        const name = formObject.name;
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('thank-you-message');
        messageContainer.innerHTML = `
            <h2>Thanks, ${name}!</h2>
            <p>Our team will reach you soon!</p>
        `;

        // Append the message to the form container
        const formContainer = document.querySelector('.contact-form');
        formContainer.innerHTML = '';
        formContainer.appendChild(messageContainer);
    });
});

/* js for slow down bgv */
document.addEventListener('DOMContentLoaded',function(){
    const video = document.getElementById('bgv')
    video.playbackRate = 0.3; //slow down the video half speed
})
/* js for slow down bgv */


/* js for nav bar */
var header = document.getElementById("navigation");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
/* js for nav bar */