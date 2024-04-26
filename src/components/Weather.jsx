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
      <div className="box">
        <h1 className="weather-title">Weather App</h1>

        <form onSubmit={handleSubmit}>
          <div className="search-inp">
            {" "}
            <input
              type="text"
              placeholder="Enter a City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="weather-input"
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="search-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg> */}
          </div>

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
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].main}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
