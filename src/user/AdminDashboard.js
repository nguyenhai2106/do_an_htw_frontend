import React from "react";
import Layout from "../core/Layout";
import { Link, useRouteMatch } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { adminLinks } from "../core/AdminLink";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  let { path, url } = useRouteMatch();

  const adminInfor = () => {
    return (
      <Card className="mb-4">
        <Card.Header>Admin Information</Card.Header>
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

  return (
    <Layout
      title="Dashboard"
      description={`Hello ${name}!`}
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfor()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
