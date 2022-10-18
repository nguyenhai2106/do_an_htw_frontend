import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { listOrders, getStatusValues } from "./apiAdmin";
import { adminLinks } from "../core/AdminLink";
import ItemOrder from "./ItemOrder";
import ItemCart from "../core/ItemCart";

import Figure from "react-bootstrap/Figure";
import { API } from "../config";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrderLength = (orders) => {
    if (orders.length > 0) {
      return <h4>Total orders: {orders.length} orders.</h4>;
    } else {
    }
    return <h3>No Orders</h3>;
  };

  const renderOrders = (orders) => {
    return (
      <tbody>
        {orders.map((order, index) => (
          <ItemOrder
            order={order}
            key={index}
            setProducts={setProducts}
            statusValues={statusValues}
            user={user}
            token={token}
            loadOrders={loadOrders}
          />
        ))}
      </tbody>
    );
  };

  const renderItems = (products) => {
    return (
      products.length > 0 && (
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td
                  style={{ width: "350px", maxHeight: "95px" }}
                  className="ooverflow-hidden"
                >
                  <div className="row">
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <strong>{product.name}</strong>
                    </Link>
                  </div>
                </td>
                <td className="text-center">${product.price}</td>
                <td className="text-center">{product.count}</td>
                <td className="text-center">
                  ${product.count * product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    );
  };

  return (
    <Layout
      title="Orders"
      description={`Hello ${user.name}, you can manage all the orders here!`}
    >
      <div className="row">
        <div className="col-md-2">{adminLinks()}</div>
        <div className="col-md-10">
          {showOrderLength(orders)}
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Order ID</th>
                <th>Transaction ID</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Order By</th>
                <th>Order On</th>
                <th>Status</th>
              </tr>
            </thead>
            {renderOrders(orders)}
          </Table>
          {renderItems(products)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
