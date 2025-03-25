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
   * This fetches weather data from the Visual Crossing API based on a location inputted by the user.
   */
  fetchWeatherData(location) {
    if (!location) {
      location = "London";
    }

    // URL encoding to handle special characters properly.
    const encodedLocation = encodeURIComponent(location);

    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?&key=${process.env.VISUAL_CROSSING_API_KEY}`
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response not okay.");
        }

        return response.json();
      })
      .then(function (data) {
        if (!data.days || !data.resolvedAddress) {
          throw new Error("No data found.");
        }
        console.log(data.resolvedAddress);
        console.log(data.days[0]);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  }
}

export default WeatherService;
