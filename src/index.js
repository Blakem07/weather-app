import WeatherSerivce from "./classes/WeatherService";
import WeatherUIController from "./classes/WeatherUIController";
import "./css-reset.css";
import "./styles.css";

import earthVideo from "./videos/earth.mp4";
import rainVideo from "./videos/rain.mp4";
import sunnyVideo from "./videos/sun.mp4";
import cloudyVideo from "./videos/cloud.mp4";

const weatherVideos = {
  default: earthVideo,
  rain: rainVideo,
  sun: sunnyVideo,
  cloud: cloudyVideo,
};

/**
 * Entry point for the weather application.
 *
 * Initializes the WeatherService and WeatherUIController,
 * then fetches and renders weather data.
 */

const weatherService = new WeatherSerivce();
const weatherUIController = new WeatherUIController(
  weatherService,
  weatherVideos
);

weatherUIController.renderWeatherData(
  await weatherService.fetchWeatherData("London")
);
