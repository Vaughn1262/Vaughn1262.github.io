const Key = '72194d221ce96885dbc793879b181b2b'; //This is an API key that I got from openweathermap.com 
const Url = 'https://api.openweathermap.org/data/2.5/weather'; // URL for the program to get the data from

//This section sets up all needed variables for updating and checking in the logic
const inputLocation = document.getElementById('inputLocation'); 
const search = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const feelslike = document.getElementById('feels_like');
const airPressure = document.getElementById('airPressure');
const weatherImage = document.querySelector(".weatherImage");
const visibility = document.getElementById('visibility');

//This code puts a check that occurs if the user clicks search button. 
//If they have a location it will get the weather for that area.
search.addEventListener('click', () => {
    const userLocation = inputLocation.value;
    if (userLocation){
        getWeather(userLocation);
    }
});

//This code checks if the user hits the enter key.
//If they have a location in the search box it will get the weather for that area.
inputLocation.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        const userLocation = inputLocation.value;
        if (userLocation){
            getWeather(userLocation);
        }  
    }
});

//This is the main logic for the program. When it is called it gets the weather for the location entered by the user from the internet
//It gets many different things such as temperature, feels like temperature, updates the weather image, location text, description, humidity, airPressure, visibility.
//It then sends the updated version to the webpage.
function getWeather(userLocation){
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
            airPressure.textContent = `Air Pressure: ${data.main.pressure} hPa`;
            visibility.textContent = `Visibility: ${data.visibility} m`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}