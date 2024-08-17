$(document).ready(function() {
    // Example: Save travel dates using local storage
    $('#save-dates').click(function() {
        let startDate = $('#trip-start-date').val();
        let endDate = $('#trip-end-date').val();
        if (startDate && endDate) {
            localStorage.setItem('tripStartDate', startDate);
            localStorage.setItem('tripEndDate', endDate);
            alert('Dates saved successfully!');
        } else {
            alert('Please enter both start and end dates.');
        }
    });

    // Example: Search for hotels using a RESTful API
    $('#search-hotels').click(function() {
        let query = $('#hotel-search').val();
        if (query) {
            $.ajax({
                url: `https://api.example.com/hotels?search=${query}`,
                method: 'GET',
                success: function(data) {
                    // Populate the hotel results
                    $('#hotel-results').empty();
                    data.results.forEach(hotel => {
                        $('#hotel-results').append(`<p>${hotel.name} - ${hotel.price}</p>`);
                    });
                },
                error: function(error) {
                    console.error('Error fetching hotels:', error);
                }
            });
        } else {
            alert('Please enter a search term.');
        }
    });

    // Example: Get weather information using a RESTful API
    $('#get-weather').click(function() {
        let location = $('#weather-location').val();
        if (location) {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=your_api_key`,
                method: 'GET',
                success: function(data) {
                    $('#weather-info').html(`<p>${data.weather[0].description}, ${data.main.temp}°C</p>`);
                },
                error: function(error) {
                    console.error('Error fetching weather:', error);
                }
            });
        } else {
            alert('Please enter a location.');
        }
    });

    // Example: Save selected hotel using session storage
    $('#hotel-results').on('click', 'p', function() {
        let selectedHotel = $(this).text();
        sessionStorage.setItem('selectedHotel', selectedHotel);
        alert('Hotel selected: ' + selectedHotel);
    });
});
