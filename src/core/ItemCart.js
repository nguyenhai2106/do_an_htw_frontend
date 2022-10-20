import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Figure from "react-bootstrap/Figure";
import { API } from "../config";
import { updateItem, removeItem } from "./cartHelper";
import Button from "react-bootstrap/Button";

const ItemCart = ({
  product,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [count, setCount] = useState(product.count);

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div style={{ width: "100px", margin: "auto" }}>
          <InputGroup>
            <Form.Control
              type="number"
              value={product.count}
              style={{ textAlign: "center" }}
              onChange={handleChange(product._id)}
              min="1"
              max={product.quantity}
            />
          </InputGroup>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <div style={{ width: "100px", margin: "auto" }}>
          <Button
            variant="danger"
            onClick={() => {
              removeItem(product._id);
              setRun(!run);
            }}
          >
            Remove
          </Button>
        </div>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    if (event.target.value < 1) {
      setCount(1);
    } else if (event.target.value > product.quantity) {
      setCount(product.quantity);
    } else {
      setCount(event.target.value);
    }
    setRun(!run);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  return (
    <tr>
      <td
        style={{ width: "350px", maxHeight: "95px" }}
        className="ooverflow-hidden"
      >
        <div className="row">
          <div className="col-4">
            <Figure className="d-flex justify-content-center align-items-center m-0">
              <Figure.Image
                alt="product image"
                src={`${API}/product/photo/${product._id}`}
                style={{
                  maxHeight: "180px",
                  boxSizing: "border-box",
                  margin: "0",
                }}
              />
            </Figure>
          </div>
          <div className="col-8">
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <strong>{product.name}</strong>
            </Link>
          </div>
        </div>
      </td>
      <td className="text-center">${product.price}</td>
      <td className="text-center">{showCartUpdateOptions(cartUpdate)}</td>
      <td className="text-center">{product.price * product.count}</td>
      <td className="text-center">
        {showRemoveButton(showRemoveProductButton)}
      </td>
    </tr>
  );
};

export default ItemCart;
