// src/Weather.js
import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "ebd3391c4eafce2e1891ede5065fae24";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Get Weather
        </button>
      </form>
      {error && <div className="weather-info">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
