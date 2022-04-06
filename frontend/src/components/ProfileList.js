import "../styles/App.scss";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { get } from "../util/rest";
import Header from "./Header";
import cornerUpLeft from "../images/icons/corner-up-left.svg";
import * as colors from "../styles/colors.module.scss";
import { Container, Card, Button, Form } from "react-bootstrap";
import undrawSearching from "../images/undraw_searching.svg";
import defaultBg from "../images/default_bg.png";

function ProfileList() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      get(`${query}`, (result) => {
        if (result?.data.length > 1) setAllProfiles([...result.data]);
        else if (result?.data) setAllProfiles([result.data]);
      });
    }
  }, [query]);

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
        <Container fluid>
          <Form className="row gv-3">
            <div className="col-md-8">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter username to search for a user"
                  style={{
                    width: "100%",
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2">
              <Button
                style={{
                  width: "100%",
                  backgroundColor: colors.blue,
                  border: "none",
                  fontWeight: "500",
                }}
                onClick={(e) => {
                  setQuery("user/profile/" + search);
                }}
              >
                Search
              </Button>
            </div>
            <div className="col-md-2">
              <Button
                style={{
                  width: "100%",
                  backgroundColor: colors.green,
                  border: "none",
                  fontWeight: "500",
                }}
                onClick={(e) => {
                  setQuery("user/users");
                }}
              >
                Get All Users
              </Button>
            </div>
          </Form>
          <div className="row gy-3">
            {allProfiles.length == 0 && (
              <div style={{ textAlign: "center", margin: "2em" }}>
                <img src={undrawSearching} height="150px" />
                <p
                  style={{
                    color: colors.lightGray,
                    fontWeight: "600",
                    marginTop: "2em",
                  }}
                >
                  No users found. Please enter a search query.
                </p>
              </div>
            )}
            {allProfiles.map((currProfile) => (
              <div className="col-md-3">
                <a href={`/profile/${currProfile.username}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={
                        currProfile.profile_photo === ""
                          ? defaultBg
                          : currProfile.profile_photo
                      }
                    />
                    <Card.Body>
                      {currProfile.first_name + " " + currProfile.last_name}
                    </Card.Body>
                  </Card>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Container>
    </>
  );
}

export default ProfileList;
