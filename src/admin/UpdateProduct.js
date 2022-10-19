import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";
import { adminLinks } from "../core/AdminLink";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const UpdateProduct = ({ match }) => {
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

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        initCategory();
      }
    });
  };

  const initCategory = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "", createdProduct: "" });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
            redirectToProfile: true,
            createdProduct: data.name,
            error: "",
          });
        }
      }
    );
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
          onChange={handleChange("name")}
          value={values.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          onChange={handleChange("description")}
          value={values.description}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          onChange={handleChange("price")}
          value={values.price}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          onChange={handleChange("category")}
          required
          value={category}
        >
          <option>{category}</option>
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
          <option>{values.shipping ? "Yes" : "No"}</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          onChange={handleChange("quantity")}
          value={quantity}
        />
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Update Product
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
        {createdProduct} is updated!
      </Alert>
    );
  };

  const showLoading = () =>
    loading && (
      <Alert key={"infor"} variant={"infor"}>
        ...
      </Alert>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/products" />;
      }
    }
  };
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
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
