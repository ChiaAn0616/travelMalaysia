// Function to request OAuth token from Amadeus API
function requestToken() {
    const clientId = "xXAS2rPoe5amCAy43EnsS4BBw0mko67E";       // Replace with your actual client ID
    const clientSecret = "3yuODJoTyCvnFob5"; // Replace with your actual client secret

    const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    body.append("client_id", clientId);
    body.append("client_secret", clientSecret);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Access Token:", data.access_token);
            return data.access_token; // Return the access token
        })
        .catch(error => {
            console.error('Error requesting token:', error);
        });
}

function getIATACode(cityName, token) {
    const apiUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${encodeURIComponent(cityName)}`;

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data && data.data.length > 0) {
            // Extract the IATA code from the first item in the data array
            const iataCode = data.data[0].iataCode;
            console.log(`Found IATA code for ${cityName}: ${iataCode}`);
            return iataCode;
        } else {
            throw new Error(`No IATA code found for city: ${cityName}`);
        }
    })
    .catch(error => {
        console.error('Error fetching IATA code:', error);
        throw error;
    });
}

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

// Function to convert a base price to the selected currency
function convertPrice(basePrice, currency) {
    let rate;
    switch (currency) {
        case 'USD': rate = 0.23; break;
        case 'EUR': rate = 0.21; break;
        case 'AED': rate = 0.85; break;
        case 'AUD': rate = 0.35; break;
        case 'CAD': rate = 0.32; break;
        case 'CNY': rate = 1.65; break;
        case 'DKK': rate = 1.6; break;
        case 'EGP': rate = 7.15; break;
        case 'FJD': rate = 0.5; break;
        case 'GBP': rate = 0.18; break;
        case 'HKD': rate = 1.8; break;
        case 'IDR': rate = 3500; break;
        case 'JPY': rate = 35; break;
        case 'KRW': rate = 290; break;
        case 'PHP': rate = 13.5; break;
        case 'SGD': rate = 0.3; break;
        case 'TWD': rate = 7; break;
        case 'THB': rate = 7.5; break;
        case 'VND': rate = 5500; break;
        case 'MYR':
        default: rate = 1; // Default rate for MYR
    }

    const convertedPrice = basePrice * rate;
    console.log(`Base price: ${basePrice}, Conversion rate: ${rate}, Converted price: ${convertedPrice}`);

    return isNaN(convertedPrice) ? 0 : convertedPrice; // Return 0 if NaN
}

function displayFlightResults(flights) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (!flights || flights.length === 0) {
        resultsContainer.innerHTML = '<p>No flights found for the selected criteria.</p>';
        return;
    }

    flights.forEach(flight => {
        const flightResult = document.createElement('div');
        flightResult.className = 'flight-result';

        const flightInfo = document.createElement('div');
        flightInfo.className = 'flight-info';

        const departure = document.createElement('div');
        departure.innerHTML = `<strong>From:</strong> ${flight.itineraries[0].segments[0].departure.iataCode} at ${new Date(flight.itineraries[0].segments[0].departure.at).toLocaleTimeString()}`;

        const arrival = document.createElement('div');
        arrival.innerHTML = `<strong>To:</strong> ${flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode} at ${new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString()}`;

        const duration = document.createElement('div');
        duration.innerHTML = `<strong>Duration:</strong> ${flight.itineraries[0].duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}`;

        flightInfo.appendChild(departure);
        flightInfo.appendChild(arrival);
        flightInfo.appendChild(duration);

        const price = document.createElement('div');
        price.className = 'price';

        // Store the original price in a data attribute
        price.dataset.originalPrice = (flight.price.total)/0.23;
        price.dataset.currency = 'MYR'; // Default currency

        // Convert and display the price in the preferred currency
        const preferredCurrency = getCurrencyPreference() || 'MYR';
        console.log(parseFloat(price.dataset.originalPrice));
        const convertedPrice = convertPrice(parseFloat(price.dataset.originalPrice), preferredCurrency);
        console.log(convertedPrice);
        price.textContent = `${currencySymbols[preferredCurrency]} ${convertedPrice.toFixed(2)}`;

        flightResult.appendChild(flightInfo);
        flightResult.appendChild(price);
        resultsContainer.appendChild(flightResult);
    });
}

// // Function to update the displayed prices based on the selected currency
// function updateDisplayedPrices(currency) {
//     const flightPrices = document.querySelectorAll('.flight-result .price');

//     flightPrices.forEach(priceElement => {
//         // Ensure the base price is correctly parsed
//         const originalPrice = parseFloat(priceElement.dataset.originalPrice);

//         // Check if originalPrice is a valid number
//         if (isNaN(originalPrice)) {
//             console.error('Invalid base price:', priceElement.dataset.originalPrice);
//             priceElement.textContent = 'Invalid price';
//             return;
//         }

//         // Convert the price to the selected currency
//         const convertedPrice = convertPrice(originalPrice, currency);

//         // Check if convertedPrice is a valid number
//         if (isNaN(convertedPrice)) {
//             console.error('Conversion resulted in NaN:', convertedPrice);
//             priceElement.textContent = 'Conversion error';
//             return;
//         }

//         // Update the displayed price
//         priceElement.textContent = `${currencySymbols[currency] || 'RM'} ${convertedPrice.toFixed(2)}`;
//     });
// }

document.getElementById('currency-selector').addEventListener('change', function() {
    const selectedCurrency = this.value;
    setCurrencyPreference(selectedCurrency);
    updateDisplayedPrices(selectedCurrency); // Update the prices with the new currency
});

document.addEventListener('DOMContentLoaded', function() {
    const preferredCurrency = getCurrencyPreference();
    const currencySelector = document.getElementById('currency-selector');
    currencySelector.value = preferredCurrency; // Set the dropdown to the preferred currency
    updateDisplayedPrices(preferredCurrency); // Update the prices on page load
});

// Function to update the displayed prices based on the selected currency
function updateDisplayedPrices(currency) {
    const flights = document.querySelectorAll('.flight-result .price');
    flights.forEach(priceElement => {
        const basePrice = parseFloat(priceElement.dataset.originalPrice);
        const convertedPrice = parseFloat(convertPrice(basePrice, currency));
        priceElement.textContent = `${currencySymbols[currency] || 'RM'} ${convertedPrice.toFixed(2)}`;
    });
}

// Function to set the currency preference in a cookie
function setCurrencyPreference(currency) {
    document.cookie = "preferredCurrency=" + currency + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    updateDisplayedPrices(currency); // Update prices immediately after setting the preference
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
    return 'MYR'; // Default currency if no preference is set
}

document.getElementById('search-btn').addEventListener('click', function() {
    const fromCity = document.getElementById('from').value.trim();
    const toCity = document.getElementById('to').value.trim();
    const date = document.getElementById('date').value;
    const currency = getCurrencyPreference(); // Get the preferred currency

    if (!fromCity || !toCity || !date) {
        alert('Please fill in all fields');
        return;
    }

    requestToken().then(token => {
        if (!token) {
            alert('Failed to obtain access token');
            return;
        }

        // Get IATA codes for both cities
        Promise.all([getIATACode(fromCity, token), getIATACode(toCity, token)])
        .then(iataCodes => {
            const from = iataCodes[0];
            const to = iataCodes[1];

            const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=1&max=1`;

            return fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                displayFlightResults(data.data, currency);
            } else {
                const resultsContainer = document.getElementById('results-container');
                resultsContainer.innerHTML = '<p>No flights found for the selected criteria.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching flight offers:', error);
            alert('Failed to fetch flight offers. Please try again.');
        });
    });
});

// Event listener for currency selection
document.getElementById('currency-selector').addEventListener('change', function() {
    const selectedCurrency = this.value;
    setCurrencyPreference(selectedCurrency);
});

// Initialize the page with the preferred currency
document.addEventListener('DOMContentLoaded', function() {
    const preferredCurrency = getCurrencyPreference();
    const currencySelector = document.getElementById('currency-selector');
    currencySelector.value = preferredCurrency; // Set the dropdown to the preferred currency
    updateDisplayedPrices(preferredCurrency); // Update the prices on page load
});