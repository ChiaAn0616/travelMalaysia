document.addEventListener('DOMContentLoaded', function () {
    const formTitle = document.getElementById('formTitle');
    const authForm = document.getElementById('authForm');
    const submitButton = document.getElementById('submitButton');
    let toggleMessage = document.getElementById('toggleMessage');

    let isLogin = false;

    function updateForm() {
        formTitle.textContent = isLogin ? 'Log In' : 'Sign Up';
        submitButton.textContent = isLogin ? 'Log In' : 'Sign Up';
        toggleMessage.innerHTML = isLogin ? 
            'Don\'t have an account? <a href="#" id="toggleFormLink">Sign Up</a>' : 
            'Already have an account? <a href="#" id="toggleFormLink">Log In</a>';
    }

    function toggleFormHandler(e) {
        e.preventDefault();
        isLogin = !isLogin;
        updateForm();
        bindToggleEvent();  // Rebind the event listener to the new link
    }

    function bindToggleEvent() {
        const toggleFormLink = document.getElementById('toggleFormLink');
        toggleFormLink.addEventListener('click', toggleFormHandler);
    }

    // Initial setup
    updateForm();
    bindToggleEvent();

    // Handle form submission
    authForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        if (isLogin) {
            // Log In logic
            const storedPassword = localStorage.getItem(username);
            if (storedPassword === password) {
                alert('Login successful!');
                localStorage.setItem('loggedInUser', username); // Use localStorage for persistent login
    
                // Redirect to the previous page
                const previousPage = localStorage.getItem('previousPage'); // Use localStorage for persistent redirection
                window.location.href = previousPage || 'home_page.html'; // Default to home if no previous page
            } else {
                alert('Invalid username or password!');
            }
        } else {
            // Sign Up logic
            if (localStorage.getItem(username)) {
                alert('Username already exists!');
            } else {
                localStorage.setItem(username, password);
                alert('Sign Up successful! Please log in.');
                isLogin = true;
                updateForm();
                bindToggleEvent();
            }
        }
    });
});

function saveCurrentPage() {
    localStorage.setItem('previousPage', window.location.href); // Use localStorage for persistent redirection
}

document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser'); // Use localStorage for persistent login
    const loginLink = document.getElementById('loginLink');

    if (loggedInUser) {
        loginLink.textContent = "Hi, " + loggedInUser + " (logout)";
        loginLink.href = '#';  // Optionally disable the link or redirect to a profile page

        // Handle logout
        loginLink.addEventListener('click', function (e) {
        e.preventDefault();

        const confirmed = confirm('Are you sure you want to log out?');
        if (confirmed) {
            localStorage.removeItem('loggedInUser'); // Remove user login
            localStorage.removeItem('previousPage'); // Optionally clear previous page
            alert('Logged out successfully!');
            window.location.href = 'home_page.html'; // Redirect to home or login page
        } else {
            alert('Logout cancelled');
        }
});
    }
});


