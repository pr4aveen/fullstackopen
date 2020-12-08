import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ allCountries, setAllCountries ] = useState([])

  useEffect(() => {
    axios
    .get(`https://restcountries.eu/rest/v2/all`)
    .then(response => setAllCountries(response.data))
  }, [])

  const updateFilter = (event) => {
    const value = event.target.value
    const filtered = () => allCountries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
    setCountries(filtered)
  }

  return (
    <div>
      <div>find countries <input onChange={updateFilter} /> </div>
      <Filter countries={countries} setCountries={setCountries}/>
    </div>)
}

export default App;
