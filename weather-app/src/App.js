// src/App.js
import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faCloud, faCloudRain, faSnowflake);

const App = () => {
  const [city, setCity] = useState('Your City');
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 25,
    description: 'Sunny',
  });
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Fetch current weather
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83bf26743d263ee15c723f74cd09dfc8`
        );
        const currentWeatherData = currentWeatherResponse.data;
        setCurrentWeather({
          temperature: Math.round(currentWeatherData.main.temp - 273.15),
          description: currentWeatherData.weather[0].description,
        });

        // Fetch 5-day forecast
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=83bf26743d263ee15c723f74cd09dfc8`
        );
        const forecastData = forecastResponse.data.list;
        // Extract daily data (assuming the API provides data in 3-hour intervals)
        const dailyForecast = forecastData.filter((data, index) => index % 8 === 0);
        setForecast(
          dailyForecast.map((data) => ({
            date: new Date(data.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            }),
            temperature: Math.round(data.main.temp - 273.15),
            description: data.weather[0].description,
          }))
        );
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
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
      <Weather city={city} temperature={currentWeather.temperature} description={currentWeather.description} loading={loading} />
      <div className="mt-4">
        <h3>5-Day Forecast</h3>
        <div className="row">
          {forecast.map((day) => (
            <div key={day.date} className="col-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{day.date}</h5>
                  <p className="card-text">{day.temperature}°C</p>
                  <p className="card-text">{day.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;