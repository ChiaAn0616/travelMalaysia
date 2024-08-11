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

    const customStartDate = document.getElementById('customStartDate');
    const customEndDate = document.getElementById('customEndDate');

    const today = new Date();
    const currentYear = today.getFullYear();
    const maxYear = currentYear + 10;

    const minDate = `${currentYear}-01-01`;
    const maxDate = `${maxYear}-12-31`;

    customStartDate.setAttribute('min', minDate);
    customStartDate.setAttribute('max', maxDate);
    customEndDate.setAttribute('min', minDate);
    customEndDate.setAttribute('max', maxDate);

    // Validate date when user types manually and leaves the input field
    customStartDate.addEventListener('blur', () => validateDate(customStartDate, minDate, maxDate));
    customEndDate.addEventListener('blur', () => validateDate(customEndDate, customStartDate.value, maxDate));

    customStartDate.addEventListener('change', () => {
        customEndDate.setAttribute('min', customStartDate.value);
    });

    customEndDate.addEventListener('change', () => {
        if (customEndDate.value < customStartDate.value) {
            customEndDate.value = customStartDate.value;
        }
    });

    // Form submission
    const customTripForm = document.getElementById('customTripForm');
    customTripForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(customTripForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log('Customized Trip Application submitted:', formObject);
        alert('Thank you for your application! We will pass your enquiries to our partnered agency and contact you soon with further details.');
        customTripForm.reset();
    });

    // Function to validate date input
    function validateDate(inputElement, minDate, maxDate) {
        const inputDate = new Date(inputElement.value);
        const min = new Date(minDate);
        const max = new Date(maxDate);

        if (inputDate < min || inputDate > max) {
            alert(`Please enter a date between ${minDate} and ${maxDate} (10 Years)`);
            inputElement.value = '';
            inputElement.focus();
        }
    }
});

