import { InputGroup, Form, FormControl, Button } from "react-bootstrap";
import "../../styles/all-exchanges.css";

function AllListings() {
  return (
    <div>
      <div className="exchange-search-box">
        <h1>All Listings</h1>
        <InputGroup className="mb-3 exchange-search-box-input">
          <FormControl
            placeholder="What are you looking for?"
            aria-label="Searchbox text"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
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
    </div>
  );
}

export default AllListings;
