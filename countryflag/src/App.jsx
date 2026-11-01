import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  const normalizedSearch = search.trim().toLowerCase()
  const filteredCountries = countries.filter((country) =>
    country.common?.toLowerCase().includes(normalizedSearch),
  )

  useEffect(() => {
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  const containerStyle ={
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    gap:"20px",
    padding:"20px"

  }

  return (
    <>
    <h1>Country wise flag and name</h1>
    <input type='text' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Enter the country name'/>
      <div className='countryCard' style={containerStyle}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className='country-card' key={country.common}>
              <img className='country-flag' src={country.png} alt={`${country.common} flag`} />
              <h2>{country.common}</h2>
            </div>
          ))
        ) : countries.length > 0 ? (
          <p role='status'>No countries found.</p>
        ) : null}
      </div>
    </>
  )
}

export default App
