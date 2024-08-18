document.addEventListener('DOMContentLoaded', () => {
    const wishlistSection = document.getElementById('wishlist-section');
    const searchBar = document.getElementById('searchBar');
    const typeFilter = document.getElementById('typeFilter');
    const stateFilter = document.getElementById('stateFilter');
    console.log(stateFilter);
    const sortFilter = document.getElementById('sortFilter');

    function renderWishlist(items) {
        wishlistSection.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('wishlist-card');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="wishlist-image">
                <div class="wishlist-content">
                    <div class="wishlist-title">${item.title}</div>
                    <div class="wishlist-category">Category: ${item.category}</div>
                    <div class="wishlist-details">${item.venue}</div>
                    <div class="wishlist-price">From: RM${item.price}</div>
                </div>
                <div class="wishlist-actions">
                    <a href="${item.link}" class="see-more-button" target="_blank">See More</a>
                    <button class="remove-button" data-id="${item.id}">Remove</button>
                </div>
            `;
            wishlistSection.appendChild(card);
        });
    }

    function updateWishlist() {
        const stateValue = stateFilter.value.toLowerCase();
        console.log(stateValue);
        const typeValue = typeFilter.value.toLowerCase(); // Convert to lowercase for matching
        const sortValue = sortFilter.value;
        const searchValue = searchBar.value.toLowerCase();
        const wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];

        let filteredWishlist = wishlist.filter(item => {
            return (stateValue === '' || item.state.toLowerCase() == stateValue) &&
                   (typeValue === '' || item.type === typeValue) &&
                   (item.title.toLowerCase().includes(searchValue) ||
                    item.category.toLowerCase().includes(searchValue) ||
                    item.venue.toLowerCase().includes(searchValue));
        });

        if (sortValue === 'price-asc') {
            filteredWishlist.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredWishlist.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'recent') {
            filteredWishlist.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        renderWishlist(filteredWishlist);
    }

    searchBar.addEventListener('input', updateWishlist);
    typeFilter.addEventListener('change', updateWishlist);
    stateFilter.addEventListener('change', updateWishlist);
    sortFilter.addEventListener('change', updateWishlist);

    wishlistSection.addEventListener('click', event => {
        if (event.target.classList.contains('remove-button')) {
            const id = event.target.dataset.id;
            let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
            wishlist = wishlist.filter(item => item.id !== id);
            sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlist();
        }
    });

    updateWishlist();
});

// Function to add to wishlist
document.addEventListener('DOMContentLoaded', () => {
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

    function updateButtonState(button, inWishlist) {
        if (inWishlist) {
            button.textContent = 'In Wishlist ♥';
            button.style.backgroundColor = 'rgb(245,245,245)';
            button.style.color = '#777';
            button.style.border = '1px solid white';
            button.style.cursor = 'default';
        } else {
            button.textContent = 'Add to Wishlist ♡ ';
            button.style.backgroundColor = 'white';
            button.style.color = 'grey'; 
            button.style.border = '1px solid grey'; 
            button.style.cursor = 'pointer';
            button.style.padding = '7px';
            button.style.transition = 'background-color 0.3s';
            button.style.border.radius = '5px';
            button.style.bottom = '10px';
            button.style.left = '10px';
        }
    } 

    addToWishlistButtons.forEach(button => {
        const card = button.closest('.event-card');
        const eventId = card.getAttribute('data-id');
        const eventType = card.getAttribute('data-type').toLowerCase(); // Get the event type from the card

        // Check if event ID is present
        if (!eventId) {
            console.error('No event ID found for this card:', card);
            return;
        }

        const eventData = {
            id: eventId,
            type: eventType, // Store the type of the event
            title: card.querySelector('.event-title').textContent,
            price: parseFloat(card.getAttribute('data-price')),
            category: card.getAttribute('data-category'),
            state: card.getAttribute('data-state'),
            venue: card.querySelector('.event-details').textContent,
            date: card.querySelector('.event-details').textContent,
            link: card.querySelector('.see-more-button').href,
            image: card.querySelector('.event-image').src
        };

        let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
        const inWishlist = wishlist.some(item => item.id === eventId);
        updateButtonState(button, inWishlist);

        button.addEventListener('click', () => {
            let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
            if (!wishlist.find(item => item.id === eventId)) {
                wishlist.push(eventData);
                sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert('Added to wishlist');
                updateButtonState(button, true);
            } else {
                wishlist = wishlist.filter(item => item.id !== eventId);
                sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert('Removedstate from wishlist');
                updateButtonState(button, false);
            }
        });
    });
});

