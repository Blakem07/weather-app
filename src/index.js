import WeatherSerivce from "./classes/WeatherService";
import WeatherUIController from "./classes/WeatherUIController";
import "./css-reset.css";
import "./styles.css";

/**
 * Front Door Script.
 *
 * Requests to the API will be made from here.
 */

const weatherService = new WeatherSerivce();
const weatherUIController = new WeatherUIController(weatherService);
