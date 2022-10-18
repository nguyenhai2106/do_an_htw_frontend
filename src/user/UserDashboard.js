import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { userLinks } from "./UserLink";
import { getPurchaseHistory } from "./apiUser";
import Figure from "react-bootstrap/Figure";
import { API } from "../config";

import ItemCart from "../core/ItemCart";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const { token } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);
  const userInfor = () => {
    return (
      <Card className="mb-4">
        <Card.Header>User Information</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{name}</ListGroup.Item>
          <ListGroup.Item>{email}</ListGroup.Item>
          <ListGroup.Item>
            {role === 1 ? "Administrator" : "Registered User"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <Card>
        <Card.Header>Purchase History</Card.Header>
        {history.map((h, i) => {
          return (
            <div key={i}>
              <Table hover style={{ margin: "0px" }}>
                <tbody>
                  {h.products.map((product, index) => (
                    <tr key={index}>
                      <td
                        style={{ width: "350px", maxHeight: "50px" }}
                        className="ooverflow-hidden"
                      >
                        <div className="row">
                          <div className="row">
                            <div className="col-4 d-flex align-item-center justify-content-center">
                              <Figure className="d-flex justify-content-center align-items-center m-0">
                                <Figure.Image
                                  alt="product image"
                                  src={`${API}/product/photo/${product._id}`}
                                  style={{
                                    maxHeight: "100px",
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
                        </div>
                      </td>
                      <td className="text-center" style={{ width: "100px" }}>
                        ${product.price}
                      </td>
                      <td className="text-center" style={{ width: "100px" }}>
                        {product.count}
                      </td>
                      <td className="text-center" style={{ width: "100px" }}>
                        ${product.count * product.price}
                      </td>
                      <td className="text-center">{h.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          );
        })}
      </Card>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello ${name}!`}
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfor()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
