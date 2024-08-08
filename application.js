document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('applicationModal');
    const closeBtn = document.querySelector('.close');
    const applyButtons = document.querySelectorAll('.apply-btn');
    const form = document.getElementById('applicationForm');

    applyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tripName = button.getAttribute('data-trip');
            document.getElementById('modalTitle').innerText = `Apply for ${tripName}`;
            document.getElementById('tripName').value = tripName;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log('Application submitted:', formObject);
        alert('Thank you for your application! We will contact you soon with further details.');
        modal.style.display = 'none';
        form.reset();
    });
});
