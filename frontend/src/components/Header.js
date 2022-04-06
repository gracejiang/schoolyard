import React from "react";
import { Button } from "react-bootstrap";

import "../styles/App.scss";
import * as colors from "../styles/colors.module.scss";
import logo from "../images/logo.png";

export default function Header() {
  return (
    <div className="dashboard-header">
      <a href="/">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} height="30px" style={{ marginRight: "10px" }} />
          <span>schoolyard</span>
        </div>
      </a>
      <div className="dashboard-navbar">
        <a href="/login">
          <Button
            style={{
              backgroundColor: colors.blue,
              border: "none",
              fontWeight: "500",
            }}
          >
            Login
          </Button>
        </a>
      </div>
    </div>
  );
}
