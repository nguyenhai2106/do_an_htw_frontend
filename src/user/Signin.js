import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
// import "../styles.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Import Sigh In
import { signin, authenticate, isAuthenticated } from "../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "khoongrox@gmail.com",
    password: "ngaoop123@",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { email, password, error, loading, redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };
  const signUpForm = () => (
    <Form>
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
        Sign In
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

  const showLoading = () => {
    return (
      <Alert
        key={"info"}
        variant={"info"}
        style={{ display: loading ? "" : "none" }}
      >
        <h2>Loading...</h2>
      </Alert>
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Sign In"
      description="Sign Ip to Node.js React.js E-commerce App!"
      className={"container col-md-8 offset-md-2"}
    >
      {showError()}
      {redirectUser()}
      {showLoading()}
      {signUpForm()}
    </Layout>
  );
};

export default Signin;
