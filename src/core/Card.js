import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./CartHelpers";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCart = ({
  isCartView = false,
  product,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  onRemove,
  onChangeCount
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const styleCard = {
    borderRadius: "0px",
  };
  const styleButton={
    borderRadius: "0px",
    margin :"10px" 
  }
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
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <Button
          onClick={addToCart}
          variant="outline-warning"
          style={styleButton}
        >
          Add to cart
        </Button>
      )
    );
  };
  const unmountItem = () => {
    onRemove();
    removeItem(product._id);
  }
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => unmountItem()}
          variant="outline-danger"
          style={styleButton}
        >
          Remove Product
        </Button>
      )
    );
  };
  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
      onChangeCount();
    }
  }
  const showCartUpdateOption = cartUpdate => {
    return cartUpdate && <div style={styleButton}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quanlity </span>
        </div>
        <input
          type="number"
          className="form-control"
          value={product.count}
          onChange={handleChange(product._id)}>
        </input>
      </div>
    </div>
  }
  return (
    // col-lg-3 col-md-6 mb-3
    <div className = {isCartView ? "col-lg-6 col-md-6 mb-3" :  "col-lg-3 col-md-6 mb-3"}>
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <Link to={"/"}>
                  <Button variant="outline-primary" style={styleButton}>
                    View Product
                  </Button>
                </Link>
                {showRemoveButton(showRemoveProductButton)}
                {showAddToCart(showAddToCartButton)}
              </div>
              {showCartUpdateOption(cartUpdate)}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCart;
