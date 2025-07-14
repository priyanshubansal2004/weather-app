import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./searchBox.css";
import { useState } from 'react';

function SearchBox({ updateInfo }) {
  const API_KEY = "8809581724ee9deea3e3a5215130dfd1";
  const [error, setError] = useState("");

  let getWeatherInfo = async (cityName) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const jsonResponse = await response.json();

      let result = {
        city: cityName,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      return result;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  let [city, setCity] = useState("");
  let handleChange = (e) => {
    setCity(e.target.value);
    setError("");
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      let newInfo = await getWeatherInfo(city);
      if (newInfo) {
        updateInfo(newInfo);
      }
      setCity("");
    }
  };

  return (
    <div className='SearchBox'>
      <h3 className='heading'>Search City for Weather</h3>
      <TextField
        label="Search City"
        variant="outlined"
        required
        onChange={handleChange}
        value={city}
      />
      {error && <p style={{ color: "black" }} className="error">{error}</p>}
      <br /><br />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
}

export default SearchBox;
