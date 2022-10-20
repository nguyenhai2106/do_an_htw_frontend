import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "../core/apiCore";
import { isAuthenticated } from "../auth/index";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from "react-bootstrap/Form";

require("dotenv").config();

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return (
      <div>
        {isAuthenticated() ? (
          <div>{showDropIn()}</div>
        ) : (
          <Link to="/signin">
            <Button variant="primary">Sign In To Checkout</Button>
          </Link>
        )}
      </div>
    );
  };

  let deliveryAdress = data.address;

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData).then((response) => {
          // console.log(response);
          const createOrderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            address: deliveryAdress,
          };
          createOrder(userId, token, createOrderData).then((response) => {
            toast.success('Payment successfully!', {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            emptyCart(() => {
              setData({ ...data, success: true });
              setRun(!run);
            });
          });
        });
      })
      .catch((error) => {
        console.log("dropin error: ", error);
        toast.error(`${error.message}`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData({ ...data, error: error.message });
      });
  };

  //Lấy thông tin địa chỉ giao hàng
  const handleAddress = (event) => {
    console.log(event.target.value);
    setData({ ...data, address: event.target.value });
  };

  //Hiện phương thức thanh toán
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "", success: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <Form.Group controlId="formBasicDescription" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your delivery address here ..."
              onChange={handleAddress}
              value={data.address}
            />
          </Form.Group>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <Button onClick={buy} variant="success" style={{ width: "100%" }}>
            Pay
          </Button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>Total:</h4>
        <h4>${getTotal(products)}</h4>
      </div>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
