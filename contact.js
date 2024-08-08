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
