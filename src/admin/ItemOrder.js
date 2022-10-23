import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Figure from "react-bootstrap/Figure";
import { API } from "../config";
import Button from "react-bootstrap/Button";
import moment from "moment";
import ItemCart from "../core/ItemCart";
import { updateOrderStatus } from "../admin/apiAdmin";

const ItemOrder = ({
  order,
  statusValues,
  user,
  token,
  setOrderItem = (f) => f,
  setProducts = (f) => f,
  loadOrders = (f) => f,
}) => {
  const handleStatusChange = (event, orderId) => {
    updateOrderStatus(user._id, token, orderId, event.target.value).then(
      (data) => {
        if (data.error) {
          console.log("Status update failed!");
        } else {
          // loadOrders();
        }
      }
    );
  };

  const showStatus = (order) => (
    <Form.Select
      aria-label="Default select example"
      style={{ textAlign: "center" }}
      onChange={(event) => handleStatusChange(event, order._id)}
    >
      <option>{order.status}</option>
      {statusValues.map((status, index) => (
        <option key={index} value={status}>
          {status}
        </option>
      ))}
    </Form.Select>
  );

  const handleMouseOver = () => {
    setOrderItem(true);
    setProducts(order.products);
  };

  const handleMouseOut = () => {
    setOrderItem(false);
    setProducts([]);
  };

  return (
    <tr>
      <td
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="overflow-hidden"
        style={{ width: "fit-content" }}
      >
        {order._id}
      </td>
      <td className="text-center">{order.transaction_id}</td>
      <td className="text-center">{order.products.length}</td>
      <td className="text-center">${order.amount}</td>
      <td className="text-center">{order.user.name}</td>
      <td className="text-center">{moment(order.createdAt).fromNow()}</td>
      <td className="text-center">{showStatus(order)}</td>
    </tr>
  );
};

export default ItemOrder;
