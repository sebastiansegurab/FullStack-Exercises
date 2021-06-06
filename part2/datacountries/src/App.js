import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [findName, setFindName] = useState('')
  const [countries, setCountries] = useState([])
  const [showData, setShowData] = useState(false)
  const [country, setCountry] = useState({})
  const [dataWeather, setDataWeather] = useState({})

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: country.name
  }

  useEffect(() => {
    if (findName !== undefined && findName !== null && findName.trim() !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${findName}`)
        .then(response => {
          setCountries(response.data);
        })
    }
  }, [findName])

  useEffect(() => {
    if (country !== undefined && country !== null) {

    }
  }, [country])

  const handleFindName = (event) => {
    setFindName(event.target.value)
  }

  const returnCountries = () => {
    if (countries.length === 1) {
      return (returnDataCountry(countries[0]))
    }
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else {
      return countries.map((country) => {
        return <p key={country.name}>{country.name} <button onClick={() => handleClickShowData(country)}>show</button></p>
      })
    }
  }

  const returnDataCountry = (country) => {
    axios
      .get('http://api.weatherstack.com/current?', { params })
      .then(response => {
        console.log(response.data)
        setDataWeather({
          location: response.data.location.name ? response.data.location.name : '',
          temperature: response.data.current.temperature ? response.data.current.temperature : '',
          icon: response.data.current.weather_icons,
          wind: response.data.current.wind_degree + ' mph direction ' + response.data.current.wind_dir
        })
      })
    return (
      <>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((language) => {
            return <li key={language.name}>{language.name}</li>
          })}
        </ul>
        <img src={country.flag} />
        <h3>Weather in {dataWeather.location}</h3>
        <p><strong>temperature: </strong> {dataWeather.temperature} Celsius</p>
        <img src={dataWeather.icon} />
        <p><strong>wind: </strong> {dataWeather.wind} Celsius</p>
      </>
    )
  }

  const handleClickShowData = (country) => {
    setShowData(!showData)
    setCountry(country)
  }

  return (
    <>
      find countries <input onChange={handleFindName} value={findName} />
      {returnCountries()}
      {showData ? returnDataCountry(country) : ''}
    </>
  );
}

export default App;
