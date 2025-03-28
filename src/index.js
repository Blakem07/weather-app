import WeatherSerivce from "./classes/WeatherService";
import WeatherUIController from "./classes/WeatherUIController";
import "./css-reset.css";
import "./styles.css";

/**
 * Entry point for the weather application.
 *
 * Initializes the WeatherService and WeatherUIController,
 * then fetches and renders weather data.
 */

const weatherService = new WeatherSerivce();
const weatherUIController = new WeatherUIController(weatherService);

weatherUIController.renderWeatherData(
  await weatherService.fetchWeatherData("London")
);
