import { Card, Button, Badge } from 'react-bootstrap'

function Listing() {
  return (
    <div className="listing">
      <Card>
        <Card.Body style={{ padding: '30px' }}>
          <div className="listing-their">
            <Card.Title>User1 is Offering</Card.Title>
            <Badge pill bg="warning">Favor</Badge>
            {' '}
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </div>
          <div className="listing-your">
            <Card.Title>User1 is Looking For</Card.Title>
            <Badge pill bg="info">Item</Badge>
            {' '}
            <Badge pill bg="success">Money</Badge>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </div>

          <div className="listing-buttons">
            <Button className="listing-button" variant="outline-secondary">
              View Details
            </Button>
            <Button className="listing-button" variant="outline-secondary">
              Message User1
            </Button>
            <Button className="listing-button" variant="outline-primary">
              Exchange!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Listing
