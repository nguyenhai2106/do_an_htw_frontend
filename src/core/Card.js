import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import moment from "moment";

const ProductCart = ({ product, showViewProductButton = true }) => {
  const styleCard = {
    borderRadius: "0px",
  };
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <Button variant="outline-primary" style={styleCard}>
            View Product
          </Button>
        </Link>
      )
    );
  };
  const showAddToCartButton = () => {
    return (
      <Link to={"/"}>
        <Button variant="primary" style={styleCard}>
          Add to Cart
        </Button>
      </Link>
    );
  };
  const showStock = (quantity, showViewProductButton) => {
      return quantity > 0 ? (
        <span className="">In stock</span>
      ) : (
        <span className="">Out stock</span>
      );
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
        <Card.Text>{product.price}$</Card.Text>
        <Card.Text className="black-8">
          Category: {product.category && product.category.name}
        </Card.Text>
        <Card.Text className="black-8">
          Added on {moment(product.createAt).fromNow()}
        </Card.Text>
        {/* chay them npm i moment */}
        <div className="d-flex justify-content-between">
          {showStock(product.quantity, showViewProductButton)}
          {showViewButton(showViewProductButton)}
          {showAddToCartButton()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCart;
