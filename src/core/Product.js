import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read } from "../core/apiCore";
import ProductCart from "../core/Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product && product.name}
      description=""
      className={"container-fluid"}
    >
      <div className="row">
        {product && product.description && (
          <ProductCart product={product} showViewProductButton={false} />
        )}
      </div>
    </Layout>
  );
};

export default Product;
