// Select Dom Elements
const searchButton = document.querySelector("button");
const cityNameInput = document.querySelector("#city-name");
const cityNameDisplay = document.querySelector(".city-name");
const countryNameDisplay = document.querySelector(".country-name");
const temperatureDisplay = document.querySelector(".temperature");
const humidityDisplay = document.querySelector(".humidity");
const descriptionDisplay = document.querySelector(".description");
const weatherStatus = document.querySelector(".weather-status");
// Base URL and API key for OpenWeatherMap
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const keyApi = "066d5e431bfd98a9b2613b25912370c3";
const getWeather = async (query) => {
  const response = await fetch(`${baseUrl}${query}&appid=${keyApi}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
//   Get Country Name
const getCounteis = async (country) => {
  const response = await fetch("countries.json");
  const data = await response.json();
  return data[country];
};
//   Get Weather
getCounteis();
const showWeather = async () => {
  const cityName = cityNameInput.value.trim().toLowerCase();
  if (cityName) {
    cityNameInput.value = "";
    try {
      const data = await getWeather(cityName);
      const codeCountry = data.sys.country;
      const countryName = await getCounteis(codeCountry);
      cityNameDisplay.innerText = `City: ${data.name}`;
      countryNameDisplay.innerText = `Country: ${countryName}`;
      temperatureDisplay.innerText = `Temperature: ${Math.round(
        data.main.temp - 273.15
      )}°C`;
      humidityDisplay.innerText = `Humidity: ${data.main.humidity}%`;
      descriptionDisplay.innerText = `${data.weather[0].description}`;
    } catch (error) {
      weatherStatus.innerHTML = `Error fetching weather data :), ${error} Please try again`;
    }
  } else {
    alert("Please enter a city name");
  }
};
searchButton.addEventListener("click", showWeather);
document.addEventListener("keyup", function (e) {
  if (e.code === `Enter`) {
    showWeather();
  }
});
