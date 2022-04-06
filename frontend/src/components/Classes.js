import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/classes.css";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import * as colors from "../styles/colors.module.scss";
import undrawSearching from "../images/undraw_searching.svg";
import cornerUpLeft from "../images/icons/corner-up-left.svg";

const COURSES_URL =
  "https://penncoursereview.com/api/base/2022A/search/courses/?search=";

export default function Classes() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const ENDPOINT = `${COURSES_URL}${query}`;
    if (query !== "") {
      axios
        .get(ENDPOINT)
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [query]);

  useEffect(() => {
    console.log("Hello");
  });

  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          padding: "4em",
          backgroundColor: colors.offWhite,
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for classes"
              />
            </Form.Group>
            <Form.Group className="col-md-3">
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
          </div>
        </Form>
        <br />
        <div className="row gy-3">
          {courses.length == 0 && (
            <div style={{ textAlign: "center", margin: "2em" }}>
              <img src={undrawSearching} height="150px" />
              <p
                style={{
                  color: colors.lightGray,
                  fontWeight: "600",
                  marginTop: "2em",
                }}
              >
                No courses found. Please enter a search query.
              </p>
            </div>
          )}
          {courses
            .filter((c) => c.num_sections > 0)
            .slice(0, 24)
            .map((c) => (
              <div className="col-md-3">
                <a href="class-dashboard">
                  <Card>
                    <Card.Body>
                      <div className="class-card-header">
                        <div>
                          <Card.Title>
                            <strong>{c.id.replace("-", " ")}</strong>
                          </Card.Title>
                          <Card.Subtitle
                            className="class-title"
                            style={{ color: colors.blue, fontWeight: "600" }}
                          >
                            {c.title}
                          </Card.Subtitle>
                        </div>
                        <div>
                          <Button
                            style={{
                              border: "none",
                              backgroundColor: colors.green,
                            }}
                            size="sm"
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                      <Card.Text className="mb-2 text-muted class-preview">
                        {c.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
}
