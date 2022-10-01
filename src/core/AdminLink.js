import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const userLinks = () => {
  return (
    <Card className="mb-4">
      <Card.Header>Admin Links</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link
            className="nav-link"
            to="/create/category"
            style={{ color: "blue" }}
          >
            Create Category
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link
            className="nav-link"
            to="/create/product"
            style={{ color: "blue" }}
          >
            Create Product
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};