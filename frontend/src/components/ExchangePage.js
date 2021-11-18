import "bootstrap/dist/css/bootstrap.min.css";

import AllListings from "./exchange/AllListings";
import YourListings from "./exchange/YourListings";

import {
  Tab,
  Tabs,
  Container,
} from "react-bootstrap";

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
            <AllListings></AllListings>
          </Tab>
          <Tab eventKey="your-listings" title="Your Listings">
            <YourListings></YourListings>
          </Tab>
        </Tabs>
        <div className="exchange-search-box"></div>
      </div>
    </Container>
  );
}

export default ExchangePage;
