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
    this.temperatureEle = document.querySelector("#temperature");
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
   */
  handleFormSubmit(event) {
    event.preventDefault(event);
    const location = this.userInputEle.value;
    this.weatherService.fetchWeatherData(location);
  }
}

export default WeatherUIController;
