import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [findName, setFindName] = useState('')
  const [countries, setCountries] = useState([])

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
      return (
        <>
          <h2>{countries[0].name}</h2>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h3>languages</h3>
          <ul>
            {countries[0].languages.map((language) => {
              return <li key={language.name}>{language.name}</li>
            })}
          </ul>
          <img src={countries[0].flag} />
        </>
      )
    }
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else {
      return countries.map((country) => {
        return <p key={country.name}>{country.name}</p>
      })
    }
  }

  return (
    <>
      find countries <input onChange={handleFindName} value={findName} />
      {returnCountries()}
    </>
  );
}

export default App;
