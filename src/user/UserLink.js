import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const userLinks = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  return (
    <Card className="mb-4">
      <Card.Header>User Links</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link
            className="nav-link"
            to="/user/dashboard"
            style={{ color: "blue" }}
          >
            Information
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link
            className="nav-link"
            to={`/profile/${_id}`}
            style={{ color: "blue" }}
          >
            Update Profile
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
