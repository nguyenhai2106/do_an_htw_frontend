import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem } from "./CartHelpers";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCart = ({ product, showAddToCartButton = true, cartUpdate= false }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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
  const showAddToCart = showAddToCartButton => {
    return (
        showAddToCartButton && (
            <Button
                onClick={addToCart}
                variant="outline-warning" 
                style={styleCard}
            >
                Add to cart
            </Button>
        )
    );
};
const handleChange = productId=> event =>{
  setCount(event.target.value < 1 ? 1 : event.target.value);
  if(event.target.value >=  1){
    updateItem(productId, event.target.value);
  }
}
const showCartUpdateOption = cartUpdate =>{
    return cartUpdate && <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quanlity </span>
        </div>
        <input 
        type="number" 
        className="form-control" 
        value={count} 
        onChange={handleChange(product._id)}>
        </input>
      </div>
    </div>
}
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
            {showAddToCart(showAddToCartButton)}
            {showCartUpdateOption(cartUpdate)}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCart;
