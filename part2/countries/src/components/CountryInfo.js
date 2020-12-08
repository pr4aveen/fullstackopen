import axios from 'axios'
import React, {useState, useEffect} from 'react'

const CountryInfo = ({data}) => {
  const {name, capital, population, languages, flag} = data
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&units=m`
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
    .get(url)
    .then( res => {
      const weatherData = {
        wind: res.data.current.wind_speed,
        windDir: res.data.current.wind_dir,
        weatherIcon: res.data.current.weather_icons[0],
        temperature: res.data.current.temperature,
      }
      setWeather(weatherData)
    })}, [url])

  const getWeatherData = (data) => {
    if (data) {
      return (<>
      <h3>weather in {capital}</h3>
      <div> <b>temperature: </b> {data.temperature} Celsius</div>
      <img src={data.weatherIcon} alt='weather' width="50" height="50"></img>
      <div> <b>wind: </b> {data.wind} km/h direction {data.windDir} </div>
      </>)
    } else {
      return <div>loading weather data...</div>
    }
  } 

  return (<div>
    <h2>{name}</h2>
    <div>capital {capital}</div>
    <div>population {population}</div>
    <h3>languages</h3>
    <ul>
      {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <img src={flag} alt="flag" width="100" height="100"></img> 
    {getWeatherData(weather)}
  </div>)
}

export default CountryInfo