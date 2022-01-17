import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Tab,
  Tabs,
  Container,
} from 'react-bootstrap'
import AllListings from './exchange/AllListings'
import YourListings from './exchange/YourListings'

function ExchangePage() {
  return (
    <Container fluid>
      <div className="exchange-page">
        <Tabs
          defaultActiveKey="all-listings"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="all-listings" title="All Listings">
            <AllListings />
          </Tab>
          <Tab eventKey="your-listings" title="Your Listings">
            <YourListings />
          </Tab>
        </Tabs>
        <div className="exchange-search-box" />
      </div>
    </Container>
  )
}

export default ExchangePage
