// Import
import { getWeather } from "./get-weather-api.js";
// Select Dom Elements
const searchButton = document.querySelector("button");
const cityNameInput = document.querySelector("#city-name");
const wheatherInfo = document.querySelector(".weather-info");
const cityNameDisplay = document.querySelector(".city-name");
const countryNameDisplay = document.querySelector(".country-name");
const temperatureDisplay = document.querySelector(".temperature");
const humidityDisplay = document.querySelector(".humidity");
const descriptionDisplay = document.querySelector(".description");
const weatherStatus = document.querySelector(".weather-status");
weatherStatus.style.display = `none`;
const loaderElemet = document.querySelector(".loader");
// Base URL and API key for OpenWeatherMap

//   Get Country Name
const getCountreis = async (country) => {
  const response = await fetch("countries.json");
  const data = await response.json();
  return data[country];
};
//   Get Weather
getCountreis();

const showWeather = async () => {
  const cityName = cityNameInput.value.trim().toLowerCase();
  if (cityName) {
    cityNameInput.value = "";
    loaderElemet.style.display = "block";
    const data = await getWeather(cityName);
    if (data.cod === 200 || data.cod === "404") {
      if (data.cod === 200) {
        weatherStatus.style.display = `flex`;
        const codeCountry = data.sys.country;
        const countryName = await getCountreis(codeCountry);
        cityNameDisplay.innerText = `City: ${data.name}`;
        countryNameDisplay.innerText = `Country: ${countryName}`;
        temperatureDisplay.innerText = `Temperature: ${Math.round(
          data.main.temp - 273.15
        )}°C`;
        humidityDisplay.innerText = `Humidity: ${data.main.humidity}%`;
        descriptionDisplay.innerText = `${data.weather[0].description}`;
        loaderElemet.style.display = "none";
      } else {
        loaderElemet.style.display = "none";
        weatherStatus.style.display = `none`;
        error(cityName);
      }
    } else {
      document.querySelector("body").innerHTML = data;
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
// Error For Wrong City Name
const error = (cityName) => {
  const er = document.createElement("h2");
  er.classList.add("error");
  er.innerText = ` ( ${cityName} ) is not found please write another city name`;
  wheatherInfo.after(er);
  setTimeout(() => {
    er.remove();
  }, 5000);
};
