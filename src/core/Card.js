import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCart = ({ product, showViewProductButton = true }) => {
  const styleCard = {
    borderRadius: "0px",
  };
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={'/product/${product._id}'}>
            <Button variant="outline-primary" style={styleCard}>
                View Product
              </Button>
        </Link>
      )
    )
  }
  return (
    // <div className="col-lg-3 col-md-6 mb-3">
    <Card style={styleCard}>
      <Card.Body>
        <ShowImage item={product} url="product" />
        <Card.Title className="overflow-hidden" style={{ height: "70px" }}>
          {product.name}
        </Card.Title>
        <Card.Text
          className="overflow-hidden"
          style={{ height: "70px", textAlign: "justify" }}
        >
          {product.description}
        </Card.Text>
        <Card.Text>{product.price}$</Card.Text>
        <div className="d-flex justify-content-between">
          {/* <Link to={'/product/${product._id}'}>
            <Button variant="outline-primary" style={styleCard}>
                View Product
              </Button>
          </Link> */}
          {showViewButton()}
          <Link to={"/"}>
            <Button variant="primary" style={styleCard}>
              Add to Cart
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
    // </div>
  );
};

export default ProductCart;
