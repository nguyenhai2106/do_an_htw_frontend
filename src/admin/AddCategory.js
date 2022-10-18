import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { adminLinks } from "../core/AdminLink";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destructure user and token from localstorage

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // Make request to api to creat category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link
          to={"/admin/dashboard"}
          className="text-warning"
          style={{ textDecoration: "none" }}
        >
          Back to Dashboard
        </Link>
      </div>
    );
  };

  const showError = () => {
    return (
      <Alert
        key={"danger"}
        variant={"danger"}
        style={{ display: error ? "" : "none" }}
      >
        Category should be unique!
      </Alert>
    );
  };

  const showSuccess = () => {
    return (
      <Alert
        key={"success"}
        variant={"success"}
        style={{ display: success ? "" : "none" }}
      >
        {name} is created.
      </Alert>
    );
  };

  const newCategoryForm = () => (
    <Form onSubmit={clickSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name of Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name of category"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Create Category
      </Button>
    </Form>
  );

  return (
    <Layout
      title="Add a new category."
      description={`Hello ${user.name}, ready to add a new category?`}
      //   className={"container-fluid"}
    >
      <div className="row">
        <div className="col-md-3">{adminLinks()}</div>
        <div className="col-md-9">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
