import { baseUrlWeather } from "./base-url-weather.js";
import { keyApi } from "./base-url-weather.js";

export const getWeather = async (query) => {
  try {
    const response = await fetch(`${baseUrlWeather}${query}&appid=${keyApi}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // <h1>Error fetching weather data :), Please try again</h1>
    const er = `          <div class="modal-error">
        <div class="in-modal-error">
          !! There is a problem with the server, please try again later :)
        </div>
      </div>`;

    return er;
  }
};
