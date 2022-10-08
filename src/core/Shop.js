import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCart from "../core/Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./RadioBox";

import { prices } from "./fixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setfilteredResults] = useState([]);

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

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setfilteredResults(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    // if (filterBy === "price") {
    //   let priceValues = handlePrice(filters);
    //   newFilters.filters[filterBy] = filters;
    // }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  // const handlePrice = (value) => {
  //   const data = value;
  //   let array = [];
  //   for (let key in data) {
  //     if (data[key]._id === parseInt(value)) {
  //       array = data[key].array;
  //     }
  //   }
  //   return array;
  // };

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
        <div className="col-8">{JSON.stringify(filteredResults)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
