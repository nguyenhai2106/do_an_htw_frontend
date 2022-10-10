import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem } from "./CartHelpers";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCart = ({ product }) => {
  const [redirect, setRedirect] = useState(false);

  const styleCard = {
    borderRadius: "0px",
  };
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    })
  }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }
  const showAddToCartButton = () => {
    return (
      <Button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
        Add to cart
      </Button>
    )
  };
  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <Card style={styleCard}>
        <Card.Body>
          {shouldRedirect(redirect)}
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
            <Link to={"/"}>
              <Button variant="outline-primary" style={styleCard}>
                View Product
              </Button>
            </Link>
            <Link>
              <Button onClick={addToCart} variant="outline-warning" style={styleCard}>
                Add to cart
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCart;
