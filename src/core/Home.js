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
    // clean các state sau khi page hiển thị này không được dùng nữa (chuyển qua page khác),
    //  để đảm bảo state không bị trùng lặp và không xuất cảnh báo warning ở console 
    // chi tiet xem o link https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    return ()=>{
      setError(false);
      setProductByArrival([]);
      setProductBySell([]);
    }
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
          <ProductCart key={index} product={product} />
        ))}
      </div>

      <h3 className="mb-2">New Arrivals</h3>
      <div className="row">
        {productByArrival.map((product, index) => (
          <ProductCart key={index} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
