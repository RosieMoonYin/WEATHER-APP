import './App.css';
import React, { useState } from 'react';
import Weather from './Weather';

const App = () => {
  const [weatherData, setWeatherData] = useState({
    city: 'Your City',
    temperature: 25,
    description: 'Sunny',
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=yourcity&appid=yourapikey'
        );
        const data = await response.json();
        setWeatherData({
          city: data.name,
          temperature: Math.round(data.main.temp - 273.15), // Convert Kelvin to Celsius
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);


  return (
    <div className="container mt-5">
      <Weather
        city={weatherData.city}
        temperature={weatherData.temperature}
        description={weatherData.description}
      />
    </div>
  );
};

export default App;

