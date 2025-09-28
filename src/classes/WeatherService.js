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

    const encodedLocation = encodeURIComponent(location);

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?&key=${process.env.VISUAL_CROSSING_API_KEY}&unitGroup=uk`
      );

      if (!response.ok) {
        throw new Error("Network response not okay.");
      }

      const data = await response.json();

      if (!data.days || !data.resolvedAddress) {
        throw new Error("No data found.");
      }

      return {
        location: this.cleanResolvedAddress(data.resolvedAddress),
        temperature: data.days[0].temp,
        conditions: data.days[0].conditions,
        feelsLike: data.days[0].feelslike,
        windSpeed: data.days[0].windspeed,
        humidity: data.days[0].humidity,
      };
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  /**
   * Cleans a resolved address string by removing unwanted parts such as zip codes,
   * numeric coordinates, or very short segments, then returns a simplified location string.
   *
   * It returns the last two parts joined by a comma, typically representing
   * a simplified location like "City, Country" or "Region, Country".
   *
   * @param {string} address - The full resolved address string to clean.
   * @returns {string} A cleaned, simplified location string.
   */
  cleanResolvedAddress(address) {
    if (!address) return "";

    const parts = address
      .split(",")
      .map((part) => part.trim())
      .filter((part) => {
        // Skip numeric-only parts (like zip codes) or very short segments
        return (
          part.length > 2 &&
          !/^\d+$/.test(part) && // e.g., "12345"
          !/^-?\d+(\.\d+)?$/.test(part) // e.g., "45.123" or "-73.456"
        );
      });

    // Return the last 2 or 3 parts (country + region, or city + country, etc.)
    return parts.slice(-2).join(", ");
  }
}

export default WeatherService;
