import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./apiAdmin";
import { adminLinks } from "../core/AdminLink";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // Load categories and set form data

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log(formData);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "", createdProduct: "" });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
          error: "",
        });
      }
    });
  };
  const newPostForm = () => (
    <Form onSubmit={clickSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange("photo")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={handleChange("name")}
          value={name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          onChange={handleChange("description")}
          value={description}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          onChange={handleChange("price")}
          value={price}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select onChange={handleChange("category")} required>
          <option>Please select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicShipping">
        <Form.Label>Shipping</Form.Label>
        <Form.Select onChange={handleChange("shipping")} required>
          <option>Please select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter quantity"
          onChange={handleChange("quantity")}
          value={quantity}
        />
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Create Product
      </Button>
    </Form>
  );

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
        {error}
      </Alert>
    );
  };

  const showSuccess = () => {
    return (
      <Alert
        key={"success"}
        variant={"success"}
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} is created.
      </Alert>
    );
  };

  const showLoading = () =>
    loading && (
      <Alert key={"infor"} variant={"infor"}>
        ...
      </Alert>
    );
  return (
    <Layout
      title="Add a new product."
      description={`Hello ${user.name}, ready to add a new product?`}
      //   className={"container-fluid"}
    >
      <div className="row">
        <div className="col-md-3">{adminLinks()}</div>
        <div className="col-md-9">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
