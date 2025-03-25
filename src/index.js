import WeatherSerivce from "./classes/WeatherService";
import "./styles.css";
import "./css-reset.css";

/**
 * Front Door Script.
 *
 * Requests to the API will be made from here.
 */

const weatherService = new WeatherSerivce();
weatherService.fetchWeatherData();
