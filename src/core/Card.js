import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelper";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ProductCard = ({
  product,
  showViewProductButton = true,
  pathCurrent,
}) => {
  const [redirect, setRedirect] = useState(false);
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

  const showStock = (quantityProduct) => {
    const styleStock = {
      lineHeight: "15.6px",
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

  const addToCart = () => {
    addItem(product, () => {
      toast.success('Product has been added to cart!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to={pathCurrent} />;
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

  return (
    <Card style={styleCard}>
      <Card.Body>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <Card.Title className="overflow-hidden" style={{ height: "50px" }}>
          {product.name}
        </Card.Title>
        <Card.Text
          className={showViewProductButton ? "overflow-hidden" : ""}
          style={{ height: "70px", textAlign: "justify" }}
        >
          {product.description}
        </Card.Text>
        <Card.Text className="mt-2 black-9 d-flex justify-content-between">
          $ {product.price} {showStock(product.quantity)} Sold: {product.sold}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Link to={`/product/${product._id}`}>
            <Button variant="outline-primary" style={styleCard}>
              View Product
            </Button>
          </Link>
          <div className="d-flex justify-content-between">
            {showAddToCartButton(product.quantity)}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
