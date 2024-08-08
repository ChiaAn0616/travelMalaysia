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

        // Here you would typically send the data to a server
        // For this example, we'll just log it to the console
        console.log('Form submitted:', formObject);

        // Show a success message
        alert('Thank you for your message! We will get back to you soon.');

        // Clear the form
        this.reset();
    });
});
