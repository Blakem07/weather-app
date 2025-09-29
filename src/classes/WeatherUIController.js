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

    this.weatherDataContainerEle = document.querySelector(
      ".weather-data-container"
    );
    this.userInputEle = document.querySelector("#user-input");
    this.conditionsEle = document.querySelector("#conditions");
    this.locationEle = document.querySelector("#location");
    this.temperatureEle = document.querySelector("#main-temp");
    this.feelsLikeEle = document.querySelector("#feels-like");
    this.windEle = document.querySelector("#wind-data");
    this.humidityEle = document.querySelector("#humidity-data");

    this.isInitialLoad = true;
    this.loadingScreenEle = document.querySelector("#loading-screen");
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
   * Display the loading overlay while preparing weather data UI.
   *
   * - Shows the loading screen (`display: flex`).
   * - Shows the weather container but hides its content (`visibility: hidden`) to
   *   maintain layout stability and prevent content flash.
   */
  showLoading() {
    this.loadingScreenEle.style.display = "flex";
    this.weatherDataContainerEle.style.display = "flex"; // Reserve layout space
    this.weatherDataContainerEle.style.visibility = "hidden"; // Hide content until ready
  }

  /**
   * Hide the loading overlay and reveal weather data.
   *
   * - Delays hiding the loading screen briefly to allow content to render.
   * - Sets container visibility to visible for smooth reveal without layout shifts.
   */
  hideLoading() {
    setTimeout(() => {
      this.loadingScreenEle.style.display = "none";
      this.weatherDataContainerEle.style.visibility = "visible";
    }, 145);
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

    if (this.isInitialLoad) {
      this.showLoading();
    }

    // Smoothly update the background video based on weather conditions
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

    // Use your updateWithFade helper to update the UI with fade effects
    this.updateWithFade(this.locationEle, data.location);
    this.updateWithFade(this.conditionsEle, data.conditions);
    this.updateWithFade(this.temperatureEle, `${temp.toFixed(1)}${unitLabel}`);
    this.updateWithFade(
      this.feelsLikeEle,
      `Feels Like: ${feelsLike.toFixed(1)}${unitLabel}`
    );
    this.updateWithFade(this.windEle, `Wind: ${data.windSpeed} MPH`);
    this.updateWithFade(this.humidityEle, `Humidity: ${data.humidity}%`);

    this.hideLoading();
    this.isInitialLoad = false;
  }

  convertTemperature(tempCelsius, unit) {
    return unit === "F" ? (tempCelsius * 9) / 5 + 32 : tempCelsius;
  }

  /**
   * Updates a DOM element's text content with a smooth fade-out/fade-in effect.
   *
   * If the new text is different from the current text, this method applies a
   * short "fade-out" class to animate the opacity, updates the content, and
   * then removes the class to fade the element back in. This helps create a
   * visually smooth UI experience during content changes.
   *
   * @param {HTMLElement} element - The DOM element to update.
   * @param {string} newText - The new text content to display.
   *
   * @returns {void}
   */
  updateWithFade(element, newText) {
    if (element.textContent === newText) return; // No change

    element.classList.add("fade-out");

    setTimeout(() => {
      element.textContent = newText;
      element.classList.remove("fade-out");
    }, 150); // Half the duration of the CSS transition
  }

  /**
   * Sets the background video based on the given weather conditions,
   * fading out the old video and fading in the new one smoothly.
   *
   * Extracts a keyword (e.g., "rain", "sun", "snow", "cloud") from the conditions string
   * using a regular expression. It then looks up the corresponding video from the
   * `weatherVideos` map and sets it as the source of the background video element.
   * If no match is found, it defaults to the "default" video.
   *
   * @param {string} conditions - A string describing the current weather conditions.
   *                              Example: "light rain", "sunny", "snow showers".
   * @returns {string} The selected video path from `weatherVideos`.
   */
  setBackgroundVideo(conditions) {
    if (!conditions) {
      return;
    }

    const regex = /(rain|sun|snow|cloud)/i;
    const match = conditions.match(regex);
    const key = match ? match[0].toLowerCase() : "default";
    const newSrc = this.weatherVideos[key] || this.weatherVideos["default"];

    const video = this.bgVideo;
    const source = video.querySelector("source");
    const currentSrc = source.getAttribute("src");

    if (currentSrc === newSrc) {
      return newSrc;
    }

    video.classList.add("fade-out");

    setTimeout(() => {
      source.setAttribute("src", newSrc);
      video.load();
      video.play().catch((error) => {
        console.warn("Video play was interrupted or blocked:", error);
      });
      video.classList.remove("fade-out");
    }, 300);

    return newSrc;
  }
}

export default WeatherUIController;
