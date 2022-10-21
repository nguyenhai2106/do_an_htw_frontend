import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
// import "../styles.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const showSuccess = () => {
    return (
      <Alert
        key={"success"}
        variant={"success"}
        style={{ display: success ? "" : "none" }}
      >
        New account is created.
        <Link to="/signin" style={{ textDecoration: "none" }}>
          Sign In
        </Link>
      </Alert>
    );
  };

  return (
    <Layout
      title="Sign Up"
      description="The key to unlock your knowledge!"
      className={"container col-md-8 offset-md-2"}
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
