import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [findName, setFindName] = useState('')
  const [countries, setCountries] = useState([])
  const [showData, setShowData] = useState(false)
  const [country, setCountry] = useState({})

  useEffect(() => {
    if (findName !== undefined && findName !== null && findName.trim() !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${findName}`)
        .then(response => {
          setCountries(response.data);
        })
    }
  }, [findName])

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
