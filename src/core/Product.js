import React, { useState, useEffect } from "react";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import Layout from "./Layout";
import Review from "./Review";
import { Link, Redirect } from "react-router-dom";
import {
  readSinglePage,
  listRelated,
  reviewRelated,
  deleteReview,
  editReview,
} from "../core/apiCore";
import { API } from "../config";
import Figure from "react-bootstrap/Figure";
import { createReview } from "./apiCore";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ProductCard from "./Card";
import { addItem } from "./cartHelper";
import { isAuthenticated } from "../auth/index";

require("dotenv").config();

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [reviews, setReviews] = useState([]);

  const loadSingleProduct = (productId) => {
    readSinglePage(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  const loadListRelated = (productId) => {
    listRelated(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRelatedProduct(data);
      }
    });
  };

  const loadListViewRelated = (productId) => {
    reviewRelated(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setReviews([...data]);
      }
    });
  };

  const [success, setSucces] = useState(false);
  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-success"
        style={{
          display: success ? "" : "none",
          textAlign: "center",
          borderRadius: "4px",
          width: "400px",
          margin: "auto",
        }}
      >
        <strong>Product has been added!</strong>
      </div>
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
      setSucces(true);
      setTimeout(() => {
        setSucces(false);
      }, 1500);
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    loadListRelated(productId);
    loadListViewRelated(productId);
  }, [props]);

  const styleCard = {
    borderRadius: "4px",
  };
  const showViewButton = (showViewProductButton) => {
    if (showViewProductButton) {
      return (
        <Button variant="outline-primary" style={styleCard}>
          View Product
        </Button>
      );
    }
  };

  const showAddToCartButton = (quantityProduct) => {
    return quantityProduct > 0 ? (
      <Button onClick={addToCart} variant="danger" style={styleCard}>
        Add to Cart
      </Button>
    ) : (
      <Link to="/" style={{ pointerEvents: "none" }}>
        <Button variant="danger" style={styleCard} disabled>
          Out Of Stock
        </Button>
      </Link>
    );
  };
  const showStock = (quantityProduct) => {
    const styleStock = {
      lineHeight: "15.6px",
      marginLeft: "10px",
      marginRight: "10px",
      position: "relative",
      top: "-1px",
    };
    return quantityProduct > 0 ? (
      <Badge pill bg="primary" style={styleStock}>
        In Stock
      </Badge>
    ) : (
      <Badge pill bg="danger" style={styleStock}>
        Out Stock
      </Badge>
    );
  };
  const [redirect, setRedirect] = useState(false);

  // Review
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, token } = isAuthenticated();
  const [newReview, setNewReview] = useState({
    user: "",
    product: "",
    description: "",
  });

  const handleChange = (name) => (event) => {
    setNewReview({
      ...newReview,
      [name]: event.target.value,
      user: user._id,
      product: props.match.params.productId,
    });
    console.log(user);
  };

  const destroy = (reviewId, index) => {
    // const tests = reviews;
    // tests.splice(index, 1);
    // console.log(tests);
    // setReviews(tests);
    deleteReview(reviewId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadListViewRelated(props.match.params.productId);
      }
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    const createReviewData = {
      user: user._id,
      product: props.match.params.productId,
      description: newReview.description,
    };
    createReview(user._id, token, JSON.stringify(createReviewData)).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setNewReview({ ...newReview, description: "" });
          loadListViewRelated(props.match.params.productId);
        }
      }
    );
  };

  return (
    <Layout
      title="Single Product Details"
      description={product.name}
      className={"container-fluid"}
    >
      {showSuccess(success)}
      <div className="row">
        <div className="col-9 my-3">
          <Card style={styleCard}>
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <Figure className="d-flex justify-content-center p-3 mb-0">
                  <Figure.Image
                    alt="product image"
                    src={`${API}/product/photo/${product._id}`}
                    style={{
                      maxHeight: "600px",
                      maxWidth: "100%",
                    }}
                  />
                </Figure>
              </div>
              <div className="col-8">
                <Card.Body>
                  <Card.Title className="overflow-hidden">
                    <h4>{product.name}</h4>
                  </Card.Title>
                  <Card.Text className="lead" style={{ textAlign: "justify" }}>
                    {product.description}
                  </Card.Text>
                  <Card.Text>
                    $ {product.price} {showStock(product.quantity)} Sold:{" "}
                    {product.sold}
                  </Card.Text>
                  <Card.Text className="">
                    Category: {product.category && product.category.name}
                  </Card.Text>
                  <Card.Text className="">
                    Added on: {moment(product.createdAt).fromNow()}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    {showAddToCartButton(product.quantity)}
                  </div>
                </Card.Body>
              </div>
            </div>
          </Card>
          {/* Review */}

          <div className="row mt-3">
            {reviews.map((review, index) => (
              <Review
                key={index}
                review={review}
                destroy={destroy}
                index={index}
              />
            ))}

            {user && (
              <Form onSubmit={clickSubmit}>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label>
                    <strong>Review</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter review..."
                    onChange={handleChange("description")}
                    value={newReview.description}
                  />
                </Form.Group>
                <Button type="submit">Post</Button>
              </Form>
            )}
          </div>
        </div>
        <div className="col-3 my-3">
          <h3>Related Products</h3>
          {relatedProduct.map((product, index) => (
            <div key={index} className="mb-3">
              <ProductCard product={product} pathCurrent={props.match.url} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
