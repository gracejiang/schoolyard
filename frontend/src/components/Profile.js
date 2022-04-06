import "../styles/App.scss";
import { Button, Container, Col, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "./scheduling/Calendar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { get, post } from "../util/rest";
import Header from "./Header";
import { collectFromHash } from "@fullcalendar/react";
import * as colors from "../styles/colors.module.scss";
import calendar from "../images/icons/calendar.svg";
import bookOpen from "../images/icons/book-open.svg";
import flag from "../images/icons/flag.svg";
import cornerUpLeft from "../images/icons/corner-up-left.svg";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    get(
      `user/profile${username ? `/${username}` : ""}`,
      (result) => {
        if (result?.data?.username) {
          setUser(result.data);
        } else {
          window.location.pathname = "/";
        }
      },
      (err) => {
        if (err && err.response) {
          if (err.response.data.message) {
            alert(err.response.data.message);
          } else {
            alert(err.response.data);
          }
        }
        window.location.pathname = "/";
      }
    );
  }, [username]);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: colors.offWhite,
          padding: "4em",
        }}
        id="profile"
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
        <Card
          style={{
            padding: "3em",
            borderColor: "#C1CAD6",
            borderRadius: "5px",
          }}
        >
          <div className="row gy-3">
            <div className="col-md-2">
              <img
                style={{ borderRadius: "5px" }}
                src={user.profile_photo}
                className="img-fluid"
              />
            </div>
            <div className="col-md-10" style={{ padding: "0 1em" }}>
              <h1 className="card-title">
                {user.first_name} {user.last_name}
              </h1>

              <h6>
                <img height="15px" src={flag} style={{ marginRight: "5px" }} />
                <strong style={{ color: colors.blue }}>School&nbsp;</strong>
                <span style={{ color: colors.lightGray }}>
                  {user.school_affiliation}
                </span>
              </h6>
              <h6 style={{ display: "flex", alignItems: "center" }}>
                <img
                  height="15px"
                  src={calendar}
                  style={{ marginRight: "5px" }}
                />
                <strong style={{ color: colors.blue }}>
                  Year of Graduation&nbsp;
                </strong>
                <span style={{ color: colors.lightGray }}>
                  {user.grad_year}
                </span>
              </h6>
              <h6>
                <img
                  height="15px"
                  src={bookOpen}
                  style={{ marginRight: "5px" }}
                />
                <strong style={{ color: colors.blue }}>Major&nbsp;</strong>
                <span style={{ color: colors.lightGray }}>{user.major}</span>
              </h6>
              <p className="text-muted">{user.bio}</p>
            </div>
          </div>
        </Card>
        <br />
        <div className="row">
          <div className="schedule">
            <h2 className="profile-section-text">Schedule</h2>
            <br />
            {user?.username && (
              <Calendar isPreview={!!username} user={user} setUser={setUser} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
