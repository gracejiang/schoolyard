import { Button, Card, Form, Alert } from "react-bootstrap";
import React, { useState } from "react";

export default function DiscussionPost({ user, post, desc }) {
  return (
    <Card
      className="bg-light"
      style={{ padding: "10px", marginBottom: "10px" }}
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
