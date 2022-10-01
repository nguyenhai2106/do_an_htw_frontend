import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <Card className="mb-4">
        <Card.Header>User Links</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Link className="nav-link" to="/cart" style={{ color: "blue" }}>
              My Cart
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link
              className="nav-link"
              to="profile/update"
              style={{ color: "blue" }}
            >
              Update Profile
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  const userInfor = () => {
    return (
      <Card className="mb-4">
        <Card.Header>User Information</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{name}</ListGroup.Item>
          <ListGroup.Item>{email}</ListGroup.Item>
          <ListGroup.Item>
            {role === 1 ? "Administrator" : "Registered User"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  const purchaseHistory = () => {
    return (
      <Card>
        <Card.Header>Purchase History</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello ${name}!`}
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfor()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
