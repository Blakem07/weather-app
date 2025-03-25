# Weather Forecast Website

## Introduction

This project is a weather forecast application that allows users to search for a specific location and get the current weather data. The data can be displayed in either Fahrenheit or Celsius, based on the user's preference. Additionally, the website dynamically adjusts its appearance based on the weather data, such as changing background colors or displaying weather-related images or gifs. These images can be fetched using the Giphy API for a fun and engaging user experience.

This application uses the **Visual Crossing Weather API** to retrieve the weather data and handles asynchronous requests with promises and async/await to improve code readability and efficiency.

## Features

- **Location Search**: Users can search for a city to retrieve the current weather.
- **Temperature Toggle**: The app allows users to toggle between displaying temperatures in Fahrenheit or Celsius.
- **Dynamic Background**: The page appearance changes based on the weather data, such as background colors that reflect the temperature or weather conditions.
- **Weather-related GIFs**: Uses the Giphy API to fetch and display weather-related gifs for a more interactive experience.
- **Async/Await and Promises**: The app utilizes modern JavaScript techniques such as async/await and promises for handling API requests and ensuring smooth, non-blocking operations.

## API Keys, Secrets, and Security

### API Key Management

For this project, an API key from **Visual Crossing Weather API** is required to fetch weather data. It is important to note that some APIs may have limitations or costs associated with usage. To avoid exposing the API key publicly, best practices include storing the key on the server using environment variables, ensuring it is never sent to the frontend.

Although for this particular project, the **Visual Crossing API key** is publicly available, **it’s crucial to be mindful of API key security in real-world applications**. Never expose sensitive keys in your frontend code (client-side) as this could result in unauthorized access or misuse.

GitHub will send warnings when it detects API keys in your code repositories, so be aware of such alerts. For this project, exposing the key is fine, but in future projects, **ensure proper security measures** are in place.

## Getting Started

### Prerequisites

To run this project locally, you’ll need the following:

- A basic understanding of JavaScript (especially async/await and promises).
- A **Visual Crossing Weather API key** (this can be obtained by registering on their website).
- A **Giphy API key** for weather-related gifs (optional but recommended for added interactivity).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Blakem07/weather-forecast-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd weather-forecast-app
   ```

3. Install the required dependencies (if any):

   ```bash
   npm install dotenv
   ```

4. Create a `.env` file in the root of the project and store your API keys there:

   ```env
   VISUAL_CROSSING_API_KEY=your-visual-crossing-api-key
   GIPHY_API_KEY=your-giphy-api-key
   ```

5. Run the app locally:
   ```bash
   npm start
   ```

### Usage

1. Enter the name of a city in the search bar.
2. Toggle between Fahrenheit and Celsius by clicking the temperature unit.
3. Enjoy the dynamic background and fun weather gifs.

## Technologies Used

- **JavaScript (ES6+)**
- **Visual Crossing Weather API**: To fetch weather data.
- **Giphy API**: For fetching weather-related gifs.
- **HTML/CSS**: To structure and style the website.
- **Async/Await & Promises**: To handle asynchronous operations.

## License

This project is licensed under the MIT License

## Acknowledgments

- Thanks to the **Visual Crossing API** for providing accurate and detailed weather data.
- Special thanks to **Giphy** for making weather-related gifs available for a more engaging user experience.

---

# Webpack Template

## Description

A Webpack template allowing for a quicker start to development was utilized in this project.

This webpack template handles:

- HTML
- CSS
- JavaScript
- IMGs (linked via css url())
- Fonts
- Webpack dev server

## Installation Instructions

1. Clone this repo:

   git clone clone https://github.com/Blakem07/webpack-template.git

2. Install dependencies:

   npm install
   npm init -y
   npm install --save-dev webpack webpack-cli
   npm install --save-dev html-webpack-plugin
   npm install --save-dev style-loader css-loader
   npm install --save-dev webpack-dev-server

## Usage

    To rebundle - npx webpack
    To run on live server - npx webpack serve
