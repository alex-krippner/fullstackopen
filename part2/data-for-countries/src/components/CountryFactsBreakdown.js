import React, {useEffect, useState} from 'react'

import axios from 'axios'


const CountryFactsBreakdown = ({country}) => {
const [weatherData, setWeatherData] = useState([])
const api_key = process.env.REACT_APP_WEATHER_API_KEY

const getWeatherData = () => {

    axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response => {
            setWeatherData(response.data)
            }
        )
}

useEffect(getWeatherData, [api_key, country.capital])
    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                capital <span>{country.capital}</span>
            </div>
            <div>
                population <span>{country.population}</span>
            </div>
            <h3>languages</h3>
                <ul>
                    {country.languages.map(lang =>
                        <li key={lang.iso639_1}>{lang.name}</li>
                        )}
                </ul>
            <img src={country.flag} style={{height: '25%', width: '25%'}} alt={`${country.name} flag`}/>
            <h3>Weather in {country.capital}</h3>
                <div>
                    <span>temperature: </span>
                    <span>{weatherData.length !== 0 ? weatherData.current.temperature : ''}</span>
                </div>
                <div>
                    {weatherData.length !== 0 ? (<img src={weatherData.current.weather_icons} alt='weather-icon'/>) : ''}
                </div>
                <div>
                    <span>wind: </span>
                    <span>{weatherData.length !== 0 ? `${weatherData.current.wind_speed} km/h direction ${weatherData.current.wind_dir}` : ''}</span>
                </div>
        </div>
    )
}

export default CountryFactsBreakdown