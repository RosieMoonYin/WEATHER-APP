// src/Weather.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import './index.css';

const Weather = ({ city, temperature, description, loading }) => {
  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case 'clear sky':
        return <FontAwesomeIcon icon="sun" />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <FontAwesomeIcon icon="cloud" />;
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
        return <FontAwesomeIcon icon="cloud-rain" />;
      case 'snow':
      case 'sleet':
      case 'shower sleet':
      case 'light snow':
      case 'heavy snow':
      case 'sleet':
      case 'shower snow':
        return <FontAwesomeIcon icon="snowflake" />;
      default:
        return null;
    }
  };

  return (
    <div className={`weather-container ${loading ? 'loading' : ''}`}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{city}</h2>
          <p>{getWeatherIcon(description)} {temperature}°C</p>
          <p>{description}</p>
        </>
      )}
    </div>
  );
};

export default Weather;