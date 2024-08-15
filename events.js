// Initialize global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');


// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Function to go to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Function to go to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize the first slide and set up slide interval
showSlide(currentSlide);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Get today's date and set the start date filter
const today = new Date();
const formattedToday = today.toISOString().split('T')[0];
document.getElementById('startDateFilter').value = formattedToday;

const placeholderTexts = [ 
    "Search for events...",
    "Explore Malaysia...",
    "Find your next adventure...",
    "Discover local festivals...",
    "What's happening near you?"
];
const searchInput = document.getElementById('search');
let currentSearchIndex = 0;

// Function to change placeholder text in search bar
function changePlaceholderText() {
    searchInput.placeholder = placeholderTexts[currentSearchIndex];
    currentSearchIndex = (currentSearchIndex + 1) % placeholderTexts.length; // Loop through the array
}
setInterval(changePlaceholderText, 2000);

// Define a mapping of currency symbols
const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'AED': 'AED',
    'AUD': 'AUD',
    'CAD': 'C$',
    'CNY': '¥',
    'DKK': 'kr',
    'EGP': 'E£',
    'FJD': 'FJ$',
    'GBP': '£',
    'HKD': 'HK$',
    'IDR': 'Rp',
    'JPY': '¥',
    'KRW': '₩',
    'PHP': '₱',
    'SGD': 'S$',
    'TWD': 'NT$',
    'THB': '฿',
    'VND': '₫',
    'MYR': 'RM'
};

// Function to update the price filter options with the correct symbols
function updatePriceFilterSymbols() {
    const currency = getCurrencyPreference() || 'MYR'; // Get the preferred currency
    const symbol = currencySymbols[currency] || currencySymbols['MYR']; // Default to MYR symbol if not found

    // Get the price filter select element
    const priceFilter = document.getElementById('priceFilter');
    
    // Update the options with the correct symbols
    priceFilter.innerHTML = `
        <option value="">Filter by Price</option>
                    <option value="0">Free of charge</option>
                    <option value="1-50">Up to ${symbol} 50</option>
                    <option value="51-100">${symbol} 51 - ${symbol} 100</option>
                    <option value="101-200">${symbol} 101 - ${symbol} 200</option>
                    <option value="201-500">${symbol} 201 - ${symbol} 500</option>
                    <option value="501-1000">${symbol} 501 - ${symbol} 1000</option>
                    <option value="1000-5000">${symbol} 1000 - ${symbol} 5000</option>
                    <option value="5000-10000">${symbol} 5000 - ${symbol} 10000</option>
                    <option value="10000-20000">${symbol} 10000 - ${symbol} 20000</option>
                    <option value="20000+">Above ${symbol} 20000</option>
    `;
}

// Function to set the currency preference in a cookie
function setCurrencyPreference(currency) {
    document.cookie = "preferredCurrency=" + currency + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    updatePrices(currency); // Update prices immediately after setting the preference
    updatePriceFilterSymbols(); // Update price filter symbols
}

// Function to get the currency preference from the cookie
function getCurrencyPreference() {
    const name = "preferredCurrency=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null; // Return null if no preference is set
}

// Function to convert a base price to the selected currency
function convertPrice(basePrice, currency) {
    switch (currency) {
        case 'USD': return basePrice * 0.23;
        case 'EUR': return basePrice * 0.21;
        case 'AED': return basePrice * 0.85;
        case 'AUD': return basePrice * 0.35;
        case 'CAD': return basePrice * 0.32;
        case 'CNY': return basePrice * 1.65;
        case 'DKK': return basePrice * 1.6;
        case 'EGP': return basePrice * 7.15;
        case 'FJD': return basePrice * 0.5;
        case 'GBP': return basePrice * 0.18;
        case 'HKD': return basePrice * 1.8;
        case 'IDR': return basePrice * 3500;
        case 'JPY': return basePrice * 35;
        case 'KRW': return basePrice * 290;
        case 'PHP': return basePrice * 13.5;
        case 'SGD': return basePrice * 0.3;
        case 'TWD': return basePrice * 7;
        case 'THB': return basePrice * 7.5;
        case 'VND': return basePrice * 5500;
        case 'MYR':
        default: return basePrice;
    }
}

// Function to update the displayed prices based on the selected currency
function updatePrices(currency) {
    const events = document.querySelectorAll('.event-card');
    events.forEach(event => {
        const priceElement = event.querySelector('.event-price');
        const basePrice = parseFloat(event.dataset.price);

        let displayPrice;
        if (basePrice !== 0) {
            displayPrice = convertPrice(basePrice, currency);
            displayPrice = `${currencySymbols[currency] || 'RM'} ${displayPrice.toFixed(currency === 'IDR' || currency === 'JPY' || currency === 'KRW' || currency === 'VND' ? 0 : 2)}`;
            priceElement.textContent = "Price: " + displayPrice;
        } else {
            priceElement.textContent = "Price: Free";
        }
    });
}

// Function to filter events based on price range and currency
function filterEventsByPrice() {
    const currency = getCurrencyPreference() || 'MYR'; // Get user preferred currency
    const priceFilter = document.getElementById('priceFilter').value;
    const events = document.querySelectorAll('.event-card');

    events.forEach(event => {
        const basePrice = parseFloat(event.dataset.price);
        const convertedPrice = convertPrice(basePrice, currency);

        let [minPrice, maxPrice] = priceFilter.split('-').map(val => val === '+' ? Infinity : parseFloat(val));

        if (priceFilter.includes('+')) {
            maxPrice = Infinity;
        }

        let matchesPrice = false;

        if (priceFilter === '0') {
            matchesPrice = (basePrice === 0); // Free events
        } else if (minPrice !== undefined && maxPrice !== undefined) {
            matchesPrice = (convertedPrice >= minPrice && convertedPrice <= maxPrice);
        }

        if (matchesPrice) {
            event.style.display = 'block'; // Show the event
        } else {
            event.style.display = 'none'; // Hide the event
        }
    });
}

// Function to filter events based on search, state, category, date, and price
function filterEvents() {
    const query = document.getElementById('search').value.toLowerCase();
    const selectedState = document.getElementById('stateFilter').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value.toLowerCase();
    const selectedStartDate = document.getElementById('startDateFilter').value;
    const selectedEndDate = document.getElementById('endDateFilter').value;
    const selectedPrice = document.getElementById('priceFilter').value;
    const currency = getCurrencyPreference() || 'MYR'; // Get user preferred currency
    const events = document.querySelectorAll('.event-card');
    let anyEventVisible = false;

    const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
    const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

    events.forEach(function(event) {
        const title = event.querySelector('.event-title').textContent.toLowerCase();
        const venue = event.querySelector('.event-details').textContent.toLowerCase();
        const state = event.dataset.state.toLowerCase();
        const categories = event.dataset.category.toLowerCase().split(',').map(c => c.trim());
        const basePrice = parseFloat(event.dataset.price);
        const eventStartDate = new Date(event.dataset.startdate);
        const eventEndDate = new Date(event.dataset.enddate);

        const convertedPrice = convertPrice(basePrice, currency);

        // Filter checks
        const matchesQuery = title.includes(query) || venue.includes(query);
        const matchesState = selectedState === '' || state === selectedState;
        const matchesCategory = selectedCategory === '' || categories.includes(selectedCategory);

        // Date filter logic
        let matchesDate = false;
        if (!startDate && !endDate) {
            matchesDate = true; // No date filter applied
        } else if (startDate && !endDate) { // Only start date is selected
            matchesDate = eventEndDate >= startDate;
        } else if (!startDate && endDate) { // Only end date is selected (just in case)
            matchesDate = eventStartDate <= endDate;
        } else { // Both start and end dates are selected
            matchesDate = (startDate <= eventEndDate && endDate >= eventStartDate);
        }

        // Price filter logic
        let matchesPrice = false;
        if (selectedPrice === '0') {
            matchesPrice = basePrice === 0; // Free events
        } else if (selectedPrice !== '') {
            const [minPrice, maxPrice] = selectedPrice.split('-').map(val => val === '+' ? Infinity : parseFloat(val));
            matchesPrice = (convertedPrice >= minPrice && convertedPrice <= maxPrice);
        } else {
            matchesPrice = true; // No price filter applied
        }

        // Determine if the event should be shown
        const showEvent = matchesQuery && matchesState && matchesCategory && matchesDate && matchesPrice;
        if (showEvent) {
            event.style.display = 'block';
            anyEventVisible = true;
        } else {
            event.style.display = 'none';
        }
    });

    // Show or hide the "No events found" message
    const noEventsMessage = document.getElementById('no-events-message');
    if (anyEventVisible) {
        noEventsMessage.style.display = 'none';
    } else {
        noEventsMessage.style.display = 'block';
    }
}

// Function to clear all filters
function clearFilter() {
    // Clear the text input
    document.getElementById('search').value = '';

    // Reset all select dropdowns
    document.getElementById('stateFilter').selectedIndex = 0;
    document.getElementById('categoryFilter').selectedIndex = 0;
    document.getElementById('priceFilter').selectedIndex = 0;

    // Clear date inputs
    document.getElementById('startDateFilter').value = '';
    document.getElementById('endDateFilter').value = '';

    // Reapply filter logic after clearing inputs
    filterEvents();
}

// Event listeners for filtering
document.getElementById('search').addEventListener('keyup', filterEvents);
document.getElementById('stateFilter').addEventListener('change', filterEvents);
document.getElementById('categoryFilter').addEventListener('change', filterEvents);
document.getElementById('priceFilter').addEventListener('change', filterEvents);
document.getElementById('startDateFilter').addEventListener('change', filterEvents);
document.getElementById('endDateFilter').addEventListener('change', filterEvents);

// Event listener for the "Clear Filters" button
document.getElementById('clearFiltersButton').addEventListener('click', clearFilter);

// Event listener for currency selection
document.getElementById('currency-selector').addEventListener('change', function() {
    const selectedCurrency = this.value;
    setCurrencyPreference(selectedCurrency);
});

// Initialize page with saved currency preference
document.addEventListener('DOMContentLoaded', () => {
    const currency = getCurrencyPreference() || 'MYR'; // Default to MYR if no preference is saved
    updatePrices(currency);
    updatePriceFilterSymbols();
    document.getElementById('currency-selector').value = currency;
});