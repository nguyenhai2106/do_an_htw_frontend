import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCart } from "./cartHelper";
import { Link } from "react-router-dom";
import ItemCart from "../core/ItemCart";
import Table from "react-bootstrap/Table";
import Checkout from "./Checkout";

require("dotenv").config();

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div className="mt-2">
        <h3>Your cart has {items.length} items!</h3>
        <hr />
      </div>
    );
  };

  const renderItems = (items) => {
    return (
      <tbody>
        {items.map((item, index) => (
          <ItemCart
            product={item}
            key={index}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </tbody>
    );
  };

  const noItemsMessage = () => (
    <h4>
      Your cart is empty.{" "}
      <Link to="/shop" style={{ textDecoration: "none" }}>
        Continue shopping
      </Link>
    </h4>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items."
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-9">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            {renderItems(items)}
          </Table>
        </div>
        <div className="col-3">
          <h3 className="mt-2">Your cart summary</h3>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
