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
    const request = new XMLHttpRequest()
    request.open(
      'GET',
      'https://countries-search-data-prod-812920491762.asia-south1.run.app/countries',
    )
    request.responseType = 'json'
    request.onload = () => {
      if (request.status >= 200 && request.status < 300 && Array.isArray(request.response)) {
        setCountries(request.response)
      } else {
        console.error(
          'Error fetching data:',
          new Error(`API request failed with status ${request.status}`),
        )
      }
    }
    request.onerror = () => console.error('Error fetching data:', new Error('Network request failed'))
    request.send()
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
      <div className='country-list' style={containerStyle}>
        {filteredCountries.map((country) => (
          <div className='countryCard country-card' key={country.common}>
            <img className='country-flag' src={country.png} alt={`${country.common} flag`} />
            <h2>{country.common}</h2>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
