import React, { useState, useEffect } from "react";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getProducts, readSinglePage, listRelated } from "../core/apiCore";
import { API } from "../config";
import Figure from "react-bootstrap/Figure";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProductCard from "./Card";
import { addItem } from "./cartHelper";

require("dotenv").config();

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const loadSingleProduct = (productId) => {
    readSinglePage(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  const loadListRelated = (productId) => {
    listRelated(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRelatedProduct(data);
      }
    });
  };

  const addToCart = () => {
    addItem(product, () => {
      console.log(product);
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    loadListRelated(productId);
  }, [props]);

  const styleCard = {
    borderRadius: "4px",
  };
  const showViewButton = (showViewProductButton) => {
    if (showViewProductButton) {
      return (
        <Button variant="outline-primary" style={styleCard}>
          View Product
        </Button>
      );
    }
  };

  const showAddToCartButton = (quantityProduct) => {
    return quantityProduct > 0 ? (
      <Button onClick={addToCart} variant="danger" style={styleCard}>
        Add to Cart
      </Button>
    ) : (
      <Link to="/" style={{ pointerEvents: "none" }}>
        <Button variant="danger" style={styleCard} disabled>
          Out Of Stock
        </Button>
      </Link>
    );
  };
  const showStock = (quantityProduct) => {
    const styleStock = {
      lineHeight: "15.6px",
      marginLeft: "10px",
      marginRight: "10px",
      position: "relative",
      top: "-1px",
    };
    return quantityProduct > 0 ? (
      <Badge pill bg="primary" style={styleStock}>
        In Stock
      </Badge>
    ) : (
      <Badge pill bg="danger" style={styleStock}>
        Out Stock
      </Badge>
    );
  };

  return (
    <Layout
      title="Single Product Details"
      description={product.name}
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-9 my-3">
          <Card style={styleCard}>
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <Figure className="d-flex justify-content-center p-3 mb-0">
                  <Figure.Image
                    alt="product image"
                    src={`${API}/product/photo/${product._id}`}
                    style={{
                      maxHeight: "600px",
                      maxWidth: "100%",
                    }}
                  />
                </Figure>
              </div>
              <div className="col-8">
                <Card.Body>
                  <Card.Title className="overflow-hidden">
                    <h4>{product.name}</h4>
                  </Card.Title>
                  <Card.Text className="lead" style={{ textAlign: "justify" }}>
                    {product.description}
                  </Card.Text>
                  <Card.Text>
                    $ {product.price} {showStock(product.quantity)} Sold:{" "}
                    {product.sold}
                  </Card.Text>
                  <Card.Text className="">
                    Category: {product.category && product.category.name}
                  </Card.Text>
                  <Card.Text className="">
                    Added on: {moment(product.createdAt).fromNow()}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    {showAddToCartButton(product.quantity)}
                  </div>
                </Card.Body>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-3 my-3">
          {relatedProduct.map((product, index) => (
            <div key={index} className="mb-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
