import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
// import "../styles.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Import Sigh Up
import { signup } from "../auth/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { name, email, password, error, success } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };
  const signUpForm = () => (
    <Form>
      <Form.Group className="mb-2" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleChange("name")}
          type="text"
          placeholder="Enter name"
          value={name}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={handleChange("email")}
          type="email"
          placeholder="Enter email"
          value={email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleChange("password")}
          type="password"
          placeholder="Password"
          value={password}
        />
      </Form.Group>
      <Button onClick={clickSubmit} variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );

  const showError = () => {
    return (
      <Alert
        key={"danger"}
        variant={"danger"}
        style={{ display: error ? "" : "none" }}
      >
        {error}
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
        New account is created. Please{" "}
        <Link to="/signin" style={{ textDecoration: "none" }}>
          Sign In
        </Link>
      </Alert>
    );
  };

  return (
    <Layout
      title="Sign Up"
      description="Sign Up to Node.js React.js E-commerce App!"
      className={"container col-md-8 offset-md-2"}
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
