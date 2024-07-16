import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [origin, setOrigin] = useState("SYD")
  const [destination, setDestination] = useState("JFK")
  const [cabin, setCabin] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleOrigin = (event) => {
    setOrigin(event.target.value)
  }

  const handleDestination = (event) => {
    setDestination(event.target.value)
  }

  const handleCabin = (event) => {
    setCabin(event.target.value)
  }


  const handleSearch = async (event) => {
    event.preventDefault()


    const json_data = {
      'origin': origin,
      'destination': destination,
      'partnerPrograms': [
        'Air Canada',
        'United Airlines',
        'KLM',
        'Qantas',
        'American Airlines',
        'Etihad Airways',
        'Alaska Airlines',
        'Qatar Airways',
        'LifeMiles',
      ],
      'stops': 2,
      'departureTimeFrom': new Date("2024-07-09T00:00:00Z").toISOString(),
      'departureTimeTo': new Date("2024-10-07T00:00:00Z").toISOString(),
      'isOldData': false,
      'limit': 302,
      'offset': 0,
      'cabinSelection': [
        cabin,
      ],
      'date': new Date('2024-07-09T12:00:17.796Z').toISOString(),
    }


    try {
      const response = await axios.post(
        'https://cardgpt.in/apitest',
        json_data,
        {
          headers: {
            'accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          }
        })
      setSearchResults(response.data.data)
      console.log("Response-", response.data.data)

    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <>
      <div className="container">
        <div className="form">
          <h3>Choose Origin and Destination Airports</h3>

          <form onSubmit={handleSearch}>
            <div className="form-layout">
              <div className="form-dropdown">
                <label for="origin">Origin</label>
                <select id="origin " value={origin} onChange={handleOrigin}>
                  <option value="JFK">JFK</option>
                  <option value="DEL">DEL</option>
                  <option value="SYD">SYD</option>
                  <option value="BOM">BOM</option>
                  <option value="BNE">BNE</option>
                  <option value="BLR">BLR</option>
                </select>
              </div>

              <div className="form-dropdown">
                <label for="destination">Destination</label>
                <select id="destination" value={destination} onChange={handleDestination}>
                  <option value="JFK">JFK</option>
                  <option value="DEL">DEL</option>
                  <option value="SYD">SYD</option>
                  <option value="LHR">LHR</option>
                  <option value="CDG">CDG</option>
                  <option value="DOH">DOH</option>
                  <option value="SIN">SIN</option>
                </select>
              </div>

              <div className="form-dropdown">
                <label for="cabin">Cabin</label>
                <select id="cabin" value={cabin} onChange={handleCabin}>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>

            <button type="submit" className='search-btn'>Search</button>
          </form>
        </div>


        {searchResults.length > 0 ? (
          <div className="searchresults-container">
            <div className="card-grid">
              {searchResults.map((result, index) => (
                <div key={index} className="result-card">
                  <div className="card-header">
                    <div className="logo-container">
                      <img
                        src="https://dummyimage.com/50x50/cccccc/ffffff&text=Logo"
                        alt={`${result.partner_program} logo`}
                        className="partner-logo"
                      />
                    </div>
                  </div>
                  <h3>{result.partner_program || "N/A"}</h3>
                  <div className="flight-info">
                    <p className="flight-path">
                      {origin} <span className="arrow">&rarr;</span> {destination}</p>
                  </div>

                  <div className="card-content">
                    <div className="cabin-economy">
                      {result.min_economy_miles && result.min_economy_tax ? (
                        <div className="price-container">
                          <span className="miles">{result.min_economy_miles}</span>
                          <span className="tax">+ ${result.min_economy_tax}</span>
                        </div>
                      ) : (
                        <p className="na">N/A</p>
                      )}
                      <p className="label">Min Economy Miles</p>
                    </div>
                    <div className="cabin-business">
                      {result.min_business_miles && result.min_business_tax ? (
                        <div className="price-container">
                          <span className="miles">{result.min_business_miles}</span>
                          <span className="tax">+ ${result.min_business_tax}</span>
                        </div>
                      ) : (
                        <p className="na">N/A</p>
                      )}
                      <p className="label">Min Business Miles</p>
                    </div>

                    <div className="cabin-first">
                      {result.min_first_miles && result.min_first_tax ? (
                        <div className="price-container">
                          <span className="miles">{result.min_first_miles}</span>
                          <span className="tax">+ ${result.min_first_tax}</span>
                        </div>
                      ) : (
                        <p className="na">N/A</p>
                      )}
                      <p className="label">Min First Miles</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-response">
            <p>Try another search route</p>
          </div>
        )


        }
      </div>
    </>
  )
}


export default App
