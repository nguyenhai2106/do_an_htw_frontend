import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "../core/apiCore";
import ProductCart from "../core/Card";

require("dotenv").config();

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node.js React.js E-commerce App!"
      className={"container-fluid"}
    >
      <h3 className="mb-2">Best Sellers</h3>
      <div className="row">
        {productBySell.map((product, index) => (
<<<<<<< HEAD
          <div className="col-lg-3 col-md-6 mb-3">
            <ProductCart key={index} product={product} />
          </div>
=======
          <div key={index} className="col-lg-3 col-md-6 mb-3">
          <ProductCart product={product} />
        </div> 
>>>>>>> 4b8ca3c3ee14cb7ff05b2cb40bd8ae06da5e7513
        ))}
      </div>

      <h3 className="mb-2">New Arrivals</h3>
      <div className="row">
        {productByArrival.map((product, index) => (
<<<<<<< HEAD
          <div className="col-lg-3 col-md-6 mb-3">
          <ProductCart key={index} product={product} />
        </div>
=======
          <div key={index} className="col-lg-3 col-md-6 mb-3">
            <ProductCart product={product} />
          </div>  
>>>>>>> 4b8ca3c3ee14cb7ff05b2cb40bd8ae06da5e7513
        ))}
      </div>
    </Layout>
  );
};

export default Home;
