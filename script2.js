const Key = '72194d221ce96885dbc793879b181b2b'; 
const Url = 'https://api.openweathermap.org/data/2.5/weather';
const inputLocation = document.getElementById('inputLocation');
const search = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity')
const feelslike = document.getElementById('feels_like');
const image = document.getElementById('weatherImage');
const weatherImage = document.querySelector(".weatherImage");


search.addEventListener('click', () => {
    const userLocation = inputLocation.value;
    if (userLocation){
        fetchWeather(userLocation);
    }
});

function fetchWeather(userLocation){
    const url = `${Url}?q=${userLocation}&appid=${Key}&units=imperial`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            locationElement.textContent = data.name;
            temperature.textContent = `Temperature: ${Math.round(data.main.temp)} F`;
            feelslike.textContent = `Feels Like: ${Math.round(data.main.feels_like)} F`;
            description.textContent = data.weather[0].main;
            humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
            

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}