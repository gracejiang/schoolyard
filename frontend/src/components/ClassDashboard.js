import "../styles/App.scss";
import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert, Modal } from "react-bootstrap";
import DiscussionPost from "./classes/DiscussionPost";
import { get, post } from "../util/rest";
import Header from "./Header";
import * as colors from "../styles/colors.module.scss";
import cornerUpLeft from "../images/icons/corner-up-left.svg";

function ClassDashboard() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState("");
  useEffect(() => {
    // TODO: check if user is logged in
    get(`user/profile`, (result) => {
      if (result?.data) setUser(result.data);
    });
  });

  function submitPost() {
    var newPost = {
      user: user.username,
      post: post,
    };
    setPosts([...posts, newPost]);
  }

  return (
    <>
      <Header />
      <div style={{ padding: "4em", backgroundColor: colors.offWhite }}>
        <a href="/classes">
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
            Back to Classes
          </p>
        </a>
        <Card style={{ padding: "2em" }}>
          <Card.Body>
            <div className="row gy-3">
              <Card.Title className="col-md-10">
                <h2>CIS 120</h2>
                <h3 style={{ color: colors.blue }}>
                  Programming Languages and Techniques I
                </h3>
              </Card.Title>
              <div className="col-md-2">
                <Button
                  style={{
                    border: "none",
                    backgroundColor: colors.green,
                    width: "100%",
                  }}
                >
                  Join Class
                </Button>
              </div>
            </div>
            <Card.Text>
              A fast-paced introduction to the fundamental concepts of
              programming and software design. This course assumes some previous
              programming experience, at the level of a high school computer
              science class or CIS110. (If you got at least 4 in the AP Computer
              Science A or AB exam, you will do great.) No specific programming
              language background is assumed: basic experience with any language
              (for instance Java, C, C++, VB, Python, Perl, or Scheme) is fine.
              If you have never programmed before, you should take CIS 110
              first.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <div className="row gy-3">
          <div className="col-md-3">
            <Alert
              style={{
                backgroundColor: colors.lightGray,
                border: "none",
                color: "white",
                fontWeight: "500",
              }}
            >
              Class Details
            </Alert>
            <Card>
              <Card.Body>
                <Card.Title>Class Times</Card.Title>
                <ul>
                  <li>MWF 1:45PM - 3:15PM</li>
                </ul>
                <Card.Title>Students</Card.Title>
                <Card.Text>
                  <ul>
                    <li>Christina Lu</li>
                    <li>Grace Jiang</li>
                    <li>Carol Li</li>
                    <li>Damian Krupa</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Alert
              style={{
                backgroundColor: colors.lightGray,
                border: "none",
                color: "white",
                fontWeight: "500",
              }}
            >
              Discussion Posts
            </Alert>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Write post here"
                  rows={8}
                  height="100%"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
              </Form.Group>
              <Button
                style={{
                  border: "none",
                  fontWeight: "500",
                  backgroundColor: colors.blue,
                  width: "100%",
                }}
                onClick={() => submitPost()}
              >
                Post
              </Button>
            </Form>
            <br />
            {posts.map((post) => (
              <DiscussionPost user={post.user} post={post.post} />
            ))}
          </div>
          <div className="col-md-3">
            <Alert
              style={{
                backgroundColor: colors.lightGray,
                border: "none",
                color: "white",
                fontWeight: "500",
              }}
            >
              Upcoming Assignments
            </Alert>
            <Card style={{ marginBottom: "10px" }}>
              <Card.Body>Homework 1</Card.Body>
            </Card>
            <Card>
              <Card.Body>Homework 2</Card.Body>
            </Card>
          </div>
        </div>
        <br />
        <div>
          <Card style={{ padding: "2em" }}>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Card.Title>
                  <h3 style={{ color: colors.blue }}>Group Project Matching</h3>
                </Card.Title>
              </div>
              <Card.Text>
                Look below for people looking for partners in group projects!
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <div>
            <h4>Homework 1</h4>
            <br />
            <DiscussionPost
              user={"hh"}
              post={"is looking for a group"}
              desc={
                "I am a sophomore in CIS with experience in Java! Would love to work together."
              }
            />
            <DiscussionPost
              user={"hh"}
              post={"is looking for a group"}
              desc={
                "I am a sophomore in CIS with experience in Java! Would love to work together."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassDashboard;
