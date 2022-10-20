import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "../core/apiCore";
import ProductCard from "../core/Card";
import Search from "./Search";

require("dotenv").config();

const Home = (props) => {
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
      description="Good books, like good friends, are few and chosen; the more select, the more enjoyable. - Louisa May Alcott"
      className={"container-fluid"}
    >
      <Search />
      <h3 className="mb-2">Best Sellers</h3>
      <div className="row">
        {productBySell.map((product, index) => (
          <div key={index} className="col-3 mb-3">
            <ProductCard product={product} pathCurrent={props.match.path} />
          </div>
        ))}
      </div>
      <h3 className="mb-2">New Arrivals</h3>
      <div className="row">
        {productByArrival.map((product, index) => (
          <div key={index} className="col-3 mb-3">
            <ProductCard product={product} pathCurrent={props.match.path} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
