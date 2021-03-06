import "../../styles/App.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { get, post } from "../../util/rest";
import Header from "../Header";
import * as colors from "../../styles/colors.module.scss";
import cornerUpLeft from "../../images/icons/corner-up-left.svg";

import {
  Figure,
  Container,
  Navbar,
  Card,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";

function Group() {
  const [group, setGroup] = useState("");
  let { id } = useParams();

  useEffect(() => {
    get(`group/group/${id}`, (result) => {
      if (result?.data) setGroup(result.data);
    });
  }, [id]);

  return (
    <>
      <Header />
      <Container
        fluid
        style={{ padding: "4em", backgroundColor: colors.offWhite }}
      >
        <a href="/grouplist">
          <p
            style={{
              color: colors.blue,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              height="15px"
              src={cornerUpLeft}
              style={{ marginRight: "10px" }}
            />
            Back to Groups
          </p>
        </a>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <h2>{group.group_name}</h2>
            <Card.Text>A group that has a lot of ducks!</Card.Text>
            <Button
              style={{ color: colors.blue, fontWeight: "500" }}
              variant="outline-info"
            >
              Clubs
            </Button>{" "}
            <Button
              style={{ color: colors.blue, fontWeight: "500" }}
              variant="outline-info"
            >
              Developing
            </Button>{" "}
            <Button
              style={{ color: colors.blue, fontWeight: "500" }}
              variant="outline-info"
            >
              Ducks
            </Button>{" "}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <br />
        <Row>
          <Col xs="8">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text>{group.description}</Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>
                  <h5>Frequently Asked Questions</h5>
                </Card.Title>
                <br />
                <Alert
                  style={{
                    backgroundColor: colors.green,
                    border: "none",
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Do you need to be a Penn student to join the group?
                </Alert>
                <Card.Text>No, you do not.</Card.Text>
                <Alert
                  style={{
                    backgroundColor: colors.green,
                    border: "none",
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Do you need to be a Penn student to join the group?
                </Alert>
                <Card.Text>No, you do not.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Basic Information</Card.Title>
                <Card.Text>{group.basic_information}</Card.Text>
                <Card.Title>Contact</Card.Title>
                <Card.Text>
                  {group.contact_email}
                  {group.contact_number}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>How to Join</Card.Title>
                <Card.Text>{group.join_instructions}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Group;
