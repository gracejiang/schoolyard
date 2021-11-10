import '../styles/exchange.css'
import Listing from './exchange/Listing'

function ExchangePage() {
    return (
      <div className="exchange-page">
        <div>
          <a href="">All Listings</a><br/>
          <a href="">Your Listings</a>
        </div>
        <div>
          <h1>Exchange</h1>
          <input placeholder="What are you looking for?"></input>
          <button>Search</button>
        </div>
        <div>
          <h3>Their Filters</h3>
          <p>
            <input type="checkbox"/>Item<br/>
            <input type="checkbox"/>Service<br/>
            <input type="checkbox"/>Money<br/>
            <button>Filter</button>
          </p>
        </div>
        <div>
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
  