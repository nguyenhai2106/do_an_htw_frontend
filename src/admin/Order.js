import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import {
  listOrders,
  getStatusValues,
  getListOrderPagination,
} from "./apiAdmin";
import { adminLinks } from "../core/AdminLink";
import ItemOrder from "./ItemOrder";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [data, setData] = useState("");

  const [searchOrder, setSearchOrder] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);

  const loadOrders = () => {
    // listOrders(user._id, token).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     setOrders(data);
    //   }
    // });
    getListOrderPagination(skip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setOrders([...orders, ...data.data]);
        setDataOrder([...dataOrder, ...data.data]);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    getListOrderPagination(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setOrders([...orders, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button variant="outline-warning" onClick={loadMore} className="mb-3">
          Load more order
        </Button>
      )
    );
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
        {orders
          .sort((a, b) => {
            const nameA = a._id.toUpperCase();
            const nameB = b._id.toUpperCase();
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
          })
          .map((order, index) => (
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

  const handleChange = (name) => (event) => {
    setData(event.target.value);
    if (event.target.value === "") {
      setOrders(dataOrder);
    }
  };

  const clickSearch = (event) => {
    event.preventDefault();
    if (data != "") {
      let arraySearch = dataOrder.filter((order) => {
        return (
          order._id.toLowerCase().includes(data, 0) ||
          order.transaction_id.toLowerCase().includes(data, 0)
        );
      });
      setOrders(arraySearch);
    } else {
      setOrders(dataOrder);
    }
  };

  return (
    <Layout
      title="Orders"
      description={`Hello ${user.name}, you can manage all the orders here!`}
    >
      <div className="row">
        <div className="col-md-2">{adminLinks()}</div>

        <div className="col-md-10">
          <div className="container">
            <div className="row">
              <div className="col-8 mx-auto my-2">
                <Form onSubmit={clickSearch}>
                  <InputGroup>
                    <Form.Control
                      type="search"
                      onChange={handleChange("search")}
                      placeholder="Search order..."
                    />
                    <Button type="submit">Search</Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </div>

          <Table striped bordered hover className="mt-2">
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
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
