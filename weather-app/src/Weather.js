// src/Weather.js
import React from 'react';

const Weather = ({ city, temperature, description }) => {
  return (
    <div className="weather-container">
      <h2>{city}</h2>
      <p>{temperature}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default Weather;
