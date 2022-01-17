import {
  InputGroup, Form, FormControl, Button,
} from 'react-bootstrap'
import Listing from './Listing'
import '../../styles/all-exchanges.css'

function AllListings() {
  return (
    <div className="exchange-all-listings">
      <div className="exchange-search-box">
        <h1>All Listings</h1>
        <InputGroup className="mb-3 exchange-search-box-input">
          <FormControl
            placeholder="What are you looking for?"
            aria-label="Searchbox text"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="exchange-filter-box">
        <Form>
          <Form.Group className="mb-3" controlId="formTheirFilter">
            <Form.Label>What are you looking for?</Form.Label>
            <Form.Check type="checkbox" label="Item" />
            <Form.Check type="checkbox" label="Favor" />
            <Form.Check type="checkbox" label="Money" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTheirFilter">
            <Form.Label>What can you offer?</Form.Label>
            <Form.Check type="checkbox" label="Item" />
            <Form.Check type="checkbox" label="Favor" />
            <Form.Check type="checkbox" label="Money" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Filter
          </Button>
        </Form>
      </div>
      <div className="exchange-listings">
        <Listing />
        <Listing />
        <Listing />
      </div>
    </div>
  )
}

export default AllListings
