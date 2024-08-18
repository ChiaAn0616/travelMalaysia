$(document).ready(function() {
    const apiKey = '08003edf7027ac884ca4d08abe06b33d';  // Replace with your actual API key

    $('#getWeather').on('click', function() {
        const city = $('#city').val().trim();
        if (city) {
            fetchWeatherData(city, apiKey);
        } else {
            alert('Please enter a city name.');
            $('#city-name').text('');
            $('#weather-icon').hide(); // Hide weather icon when no city is entered
            $('.details p').text(''); // Clear weather details
        }
    });

    function fetchWeatherData(city, apiKey) {
        const currentWeatherUrl = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

        $.ajax({
            url: currentWeatherUrl,
            method: 'GET',
        }).done(function(response) {
            if (response.error) {
                alert(`Error: ${response.error.info}`);
                $('#city-name').text('');
                $('#weather-icon').hide(); // Hide weather icon on error
                $('.details p').text(''); // Clear weather details
                return;
            }
            displayCityName(response.location.name);
            displayCurrentWeather(response.current);
        }).fail(function() {
            alert('Failed to retrieve weather data.');
            $('#city-name').text('');
            $('#weather-icon').hide(); // Hide weather icon on fail
            $('.details p').text(''); // Clear weather details
        });
    }

    function displayCityName(city) {
        $('#city-name').text(city);
    }

    function displayCurrentWeather(data) {
        $('#temperature').text(`${data.temperature}°C`);
        $('#precipitation').text(`${data.precip} mm`);
        $('#humidity').text(`${data.humidity}%`);
        $('#wind-speed').text(`${data.wind_speed} km/h`);
        $('#weather-description').text(data.weather_descriptions[0]);
    
        const weatherIconUrl = data.weather_icons[0];
        console.log(weatherIconUrl); // Log to check if the URL is correct
    
        $('#weather-icon').attr('src', weatherIconUrl).css('display', 'block'); // Explicitly show the icon
    
        $('#weather-icon').on('error', function() {
            console.error('Failed to load weather icon');
            $(this).hide(); // Hide the icon if loading fails
        });
    }
});
