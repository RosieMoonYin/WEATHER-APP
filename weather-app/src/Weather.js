// src/Weather.js
import React from 'react';

const Weather = ({ city, temperature, description, loading }) => {
  return (
    <div className="weather-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{city}</h2>
          <p>{temperature}°C</p>
          <p>{description}</p>
        </>
      )}
    </div>
  );
};

export default Weather;