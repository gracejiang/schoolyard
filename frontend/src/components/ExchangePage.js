import '../styles/exchange-page.css'
import Listing from './exchange/Listing'

function ExchangePage() {
    return (
      <div className="exchange-page">
        <div className="exchange-navbar">
          <ul>
            <li><a href="">All Listings</a></li>
            <li><a href="">Your Listings</a></li>
          </ul>
        </div>
        <div className="exchange-search-box">
          <h1>Exchanges Page</h1>
          <input placeholder="What are you looking for?"></input>
          <button>Search</button>
        </div>
        <div className="exchange-filters1">
          <h3>Their Filters</h3>
          <p>
            <input type="checkbox"/>Item<br/>
            <input type="checkbox"/>Service<br/>
            <input type="checkbox"/>Money<br/>
            <button>Filter</button>
          </p>
        </div>
        <div className="exchange-filters2">
          <h3>Your Filters</h3>
          <p>
            <input type="checkbox"/>Item<br/>
            <input type="checkbox"/>Service<br/>
            <input type="checkbox"/>Money<br/>
            <button>Filter</button>
          </p>
        </div>
        <div className="exchange-listings">
          <Listing/>
        </div>
      </div>
    )
  }
  
  export default ExchangePage
  