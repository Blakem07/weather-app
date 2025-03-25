import WeatherSerivce from "./classes/WeatherService";

/**
 * Front Door Script.
 *
 * Requests to the API will be made from here.
 */

const weatherService = new WeatherSerivce();
weatherService.fetchWeatherData();
