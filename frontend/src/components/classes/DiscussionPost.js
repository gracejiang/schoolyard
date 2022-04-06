import { Button, Card, Form, Alert } from "react-bootstrap";
import React, { useState } from "react";

export default function DiscussionPost({ user, post, desc }) {
  return (
    <Card
      style={{ backgroundColor: "white", padding: "2em", marginBottom: "2em" }}
    >
      <h3>{user}</h3>
      {post}
      <br />
      <p>
        <em>{desc}</em>
      </p>
    </Card>
  );
}
