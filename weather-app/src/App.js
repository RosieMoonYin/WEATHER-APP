// src/App.js
import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const App = () => {
  const [city, setCity] = useState('Your City');
  const [weatherData, setWeatherData] = useState({
    temperature: 25,
    description: 'Sunny',
  });

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83bf26743d263ee15c723f74cd09dfc8`
        );
        const data = await response.json();
        setWeatherData({
          temperature: Math.round(data.main.temp - 273.15),
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="cityInput" className="form-label">
          Enter City:
        </label>
        <input
          type="text"
          className="form-control"
          id="cityInput"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      <Weather city={city} temperature={weatherData.temperature} description={weatherData.description} />
    </div>
  );
};

export default App;
