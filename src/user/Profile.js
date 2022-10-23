import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { userLinks } from "./UserLink";
import { read, update, updateUser } from "./apiUser";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { token, user } = isAuthenticated();

  const { name, email, password, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              password: data.password,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };
  const profileUpdate = () => (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange("name")}
          value={values.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange("email")}
          value={values.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={handleChange("password")}
          value={values.password}
        />
      </Form.Group>
      <Button variant="outline-primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
  );

  return (
    <Layout
      title="Profile"
      description={`Hello ${name}. Update your profile!`}
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {profileUpdate()}
          {redirectUser(success)}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
