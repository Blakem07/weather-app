/**
 * Weather UI Controller Class.
 *
 * This class will handle UI updates based on weather data
 * that it recieves and event handling.
 */
class WeatherUIController {
  constructor(weatherService) {
    this.weatherService = weatherService;
    this.initDOMElements();
    this.initEventHandlers();
  }

  initDOMElements() {
    this.locationFormEle = document.querySelector(".search-form");
    this.userInputEle = document.querySelector("#user-input");
    this.conditionsEle = document.querySelector("#conditions");
    this.locationEle = document.querySelector("#location");
    this.temperatureEle = document.querySelector("#main-temp");
    this.feelsLikeEle = document.querySelector("#feels-like");
    this.windEle = document.querySelector("#wind-data");
    this.humidityEle = document.querySelector("#humidity-data");
  }

  initEventHandlers() {
    this.locationFormEle.addEventListener("submit", (event) => {
      this.handleFormSubmit(event);
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
    console.log(weatherData);
  }

  /**
   * Render Weather Data Method.
   *
   * Updates the UI with the using a filtered weather data object passed to it
   * as an argument.
   */
  renderWeatherData(data) {
    this.locationEle.textContent = data.location;
    this.conditionsEle.textContent = data.conditions;
    this.temperatureEle.textContent = `${data.temperature}`;
    this.feelsLikeEle.textContent = `${data.feelsLike}°C`;
    this.humidityEle.textContent = `${data.humidity}%`;
  }
}

export default WeatherUIController;
