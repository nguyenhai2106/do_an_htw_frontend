import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCart = ({ product }) => {
  const styleCard = {
    borderRadius: "px",
  };
  return (
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
        <Card.Text>$ {product.price}</Card.Text>
        <div className="d-flex justify-content-between">
          <Link to={"/"}>
            <Button variant="outline-primary" style={styleCard}>
              View Product
            </Button>
          </Link>
          <Link to={"/"}>
            <Button variant="danger" style={styleCard}>
              Add to Cart
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCart;
