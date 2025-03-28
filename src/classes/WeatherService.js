/**
 * Weather Service Class.
 *
 * This class will make requests to the Visual Crossing API, fetching weather data based on
 * the location inputted by the user.
 */
class WeatherService {
  /**
   * Fetch Weather Data Method.
   *
   * Fetches weather data from the Visual Crossing API based on a location inputted by the user.
   */

  /**
   * Fetch Weather Data Method.
   *
   * This async function returns a resolved promise. It uses await fetch() to pause the method until the fetch
   * has been completed.
   */
  async fetchWeatherData(location) {
    if (!location) {
      location = "London";
    }

    // URL encoding to handle special characters properly.
    const encodedLocation = encodeURIComponent(location);

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?&key=${process.env.VISUAL_CROSSING_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Network response not okay.");
      }

      const data = await response.json();

      if (!data.days || !data.resolvedAddress) {
        throw new Error("No data found.");
      }

      return data.days[0];
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

export default WeatherService;
