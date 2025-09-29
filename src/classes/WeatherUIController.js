/**
 * Weather UI Controller Class.
 *
 * This class will handle UI updates based on weather data
 * that it recieves and event handling.
 */
class WeatherUIController {
  constructor(weatherService, weatherVideos) {
    this.weatherService = weatherService;
    this.weatherVideos = weatherVideos;

    this.initDOMElements();
    this.initEventHandlers();
  }

  initDOMElements() {
    this.locationFormEle = document.querySelector(".search-form");

    this.unitToggle = document.querySelector("#unit-toggle");
    this.temperatureUnit = "C";
    this.currentWeatherData = null;

    this.userInputEle = document.querySelector("#user-input");
    this.conditionsEle = document.querySelector("#conditions");
    this.locationEle = document.querySelector("#location");
    this.temperatureEle = document.querySelector("#main-temp");
    this.feelsLikeEle = document.querySelector("#feels-like");
    this.windEle = document.querySelector("#wind-data");
    this.humidityEle = document.querySelector("#humidity-data");

    this.bgVideo = document.getElementById("background-video");
  }

  initEventHandlers() {
    this.locationFormEle.addEventListener("submit", (event) => {
      this.handleFormSubmit(event);
    });

    // Re-render weather data on unit toggle
    this.unitToggle.addEventListener("change", () => {
      this.temperatureUnit = this.unitToggle.checked ? "F" : "C";
      if (this.currentWeatherData) {
        this.renderWeatherData(this.currentWeatherData);
      }
    });
  }

  /**
   * Handle Form Submit Method.
   *
   * Passes the location inputted by the user as an argument to the
   * the weather services fetch weather data method.
   *
   * This method is async as it is a wrapper for weatherService.fetchWeatherData().
   */
  async handleFormSubmit(event) {
    event.preventDefault(event);
    const location = this.userInputEle.value;
    const weatherData = await this.weatherService.fetchWeatherData(location);
    this.renderWeatherData(weatherData);
    this.userInputEle.value = "";
  }

  /**
   * Renders the weather data to the UI.
   *
   * This method updates the DOM elements with the provided weather data,
   * applying temperature conversions based on the currently selected unit
   * (Celsius or Fahrenheit). It also stores the latest weather data internally
   * to allow re-rendering when the unit is toggled.
   *
   * @param {Object} data - A filtered weather data object.
   * @param {string} data.location - The name of the location.
   * @param {string} data.conditions - Weather condition description (e.g., "Sunny").
   * @param {number} data.temperature - Temperature in Celsius.
   * @param {number} data.feelsLike - Feels-like temperature in Celsius.
   * @param {number} data.windSpeed - Wind speed in MPH.
   * @param {number} data.humidity - Humidity percentage.
   *
   * @returns {void}
   */
  renderWeatherData(data) {
    if (!data || typeof data !== "object") {
      console.error("Invalid weather data provided:", data);
      return;
    }

    this.currentWeatherData = data; // Save for re-rendering

    this.setBackgroundVideo(data.conditions);

    const temp = this.convertTemperature(
      data.temperature,
      this.temperatureUnit
    );
    const feelsLike = this.convertTemperature(
      data.feelsLike,
      this.temperatureUnit
    );
    const unitLabel = this.temperatureUnit === "F" ? "°F" : "°C";

    this.locationEle.textContent = data.location;
    this.conditionsEle.textContent = data.conditions;
    this.temperatureEle.textContent = `${temp.toFixed(1)}${unitLabel}`;
    this.feelsLikeEle.textContent = `Feels Like: ${feelsLike.toFixed(
      1
    )}${unitLabel}`;
    this.windEle.textContent = `Wind: ${data.windSpeed} MPH`;
    this.humidityEle.textContent = `Humidity: ${data.humidity}%`;
  }

  convertTemperature(tempCelsius, unit) {
    return unit === "F" ? (tempCelsius * 9) / 5 + 32 : tempCelsius;
  }

  /**
   * Sets the background video based on the given weather conditions.
   *
   * Extracts a keyword (e.g., "rain", "sun", "snow", "cloud") from the conditions string
   * using a regular expression. It then looks up the corresponding video from the
   * `weatherVideos` map and sets it as the source of the background video element.
   * If no match is found, it defaults to the "default" video.
   *
   * @param {string} conditions - A string describing the current weather conditions.
   *                              Example: "light rain", "sunny", "snow showers".
   * @returns {string} The selected video path from `weatherVideos`,
   *
   */
  setBackgroundVideo(conditions) {
    if (!conditions) {
      return;
    }

    const regex = /(rain|sun|snow|cloud)/i;
    const match = conditions.match(regex);
    const key = match ? match[0].toLowerCase() : "default";

    this.bgVideo.src = this.weatherVideos[key];

    return this.weatherVideos[key] || this.weatherVideos["default"];
  }
}

export default WeatherUIController;
