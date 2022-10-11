import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCart from "../core/Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./RadioBox";

import { prices } from "./fixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find product of your choice!"
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div style={{ listStyleType: "none", padding: "0px" }}>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
        {/* <div className="col-lg-3 col-md-6 mb-3">
            <ProductCart key={index} product={product} />
        </div> */} sẽ thay thế code như v. Kha chỉnh them chi tiet sp
      </div>
    </Layout>
  );
};

export default Shop;
