import React, { useState, useEffect } from "react";

const WeatherDisplay = ({ selectedDate }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;
      const formattedDate = selectedDate.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/College%20Station%2C%20TX/${formattedDate}?unitGroup=us&include=days&key=${apiKey}&contentType=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [selectedDate]);

  return (
    <div>
      <h2>Weather Forecast for {selectedDate.toLocaleDateString()}</h2>
      {weatherData ? (
        <div>
          <p>Location: {weatherData.resolvedAddress}</p>
          <p>Current Weather: {weatherData.days[0].description}</p>
          <p>Temperature: {weatherData.days[0].temp} °F</p>
          <p>Max Temperature: {weatherData.days[0].tempmax} °F</p>
          <p>Min Temperature: {weatherData.days[0].tempmin} °F</p>
          <p>Humidity: {weatherData.days[0].humidity}%</p>
          <p>Precipitation: {weatherData.days[0].precip} in</p>
          <p>Conditions: {weatherData.days[0].conditions}</p>
          {/* Display Dew if available */}
          {weatherData.days[0].dew && (
            <p>Dew: {weatherData.days[0].dew} </p>
          )}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
