import "../../styles/App.scss";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { get } from "../../util/rest";
import Header from "../Header";
import defaultBg from "../../images/default_bg.png";
import * as colors from "../../styles/colors.module.scss";
import cornerUpLeft from "../../images/icons/corner-up-left.svg";

import { Form, Container, Card, Button } from "react-bootstrap";

function GroupList() {
  const [allGroups, setAllGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    get(`group/groups`, (result) => {
      if (result?.data) setAllGroups([...result.data]);
    });
  }, []);

  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          backgroundColor: colors.offWhite,
          padding: "4em",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <a href="/">
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
            Back to Home
          </p>
        </a>
        <Form>
          <div className="row gy-3">
            <Form.Group className="col-md-9">
              <Form.Control
                type="text"
                value={search}
                placeholder="Search for groups"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="col-md-1">
              <Button
                style={{
                  border: "none",
                  backgroundColor: colors.blue,
                  width: "100%",
                  fontWeight: "500",
                }}
                onClick={(e) => {
                  setQuery(search);
                }}
              >
                Search
              </Button>
            </Form.Group>
            <Form.Group className="col-md-2">
              <a href="/new-group">
                <Button
                  style={{
                    border: "none",
                    backgroundColor: colors.green,
                    width: "100%",
                    fontWeight: "500",
                  }}
                >
                  New Group
                </Button>
              </a>
            </Form.Group>
          </div>
        </Form>
        <br />
        <div className="row gy-3">
          {allGroups.map(
            (currGroup) =>
              currGroup.group_name
                .toLowerCase()
                .includes(query.toLowerCase()) && (
                <div className="col-md-3">
                  <a href={`/group/${currGroup._id}`}>
                    <Card style={{ borderColor: colors.lightGray }}>
                      <Card.Img variant="top" src={defaultBg} />
                      <Card.Body style={{ fontWeight: "500" }}>
                        <h6>{currGroup.group_name}</h6>
                        <span style={{ color: colors.lightGray }}>
                          22 members
                        </span>
                      </Card.Body>
                    </Card>
                  </a>
                </div>
              )
          )}
        </div>
      </Container>
    </>
  );
}

export default GroupList;
