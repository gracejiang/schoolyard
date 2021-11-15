import { Card, Button } from "react-bootstrap";

function Listing() {
  return (
    <div className="listing">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      {/* <h2>this is a listing</h2>
      <p>
        <b>User 1</b>is offering
      </p>
      <p>
        <b>User 2</b>is offering
      </p>
      <p>
        <button>View Details</button>
        <button>Message</button>
        <button>Exchange!</button>
      </p> */}
    </div>
  );
}

export default Listing;
