import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCard from "../core/Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./RadioBox";
import Button from "react-bootstrap/Button";
import { prices } from "./fixedPrices";
import Search from "./Search";

const Shop = (props) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
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
        setfilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setfilteredResults([...filteredResults, ...data.data]);
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
          Load more product
        </Button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
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
      <Search />
      <div className="row">
        <div className="col-3">
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
        <div className="col-9">
          <div className="row">
            {filteredResults.map((result, index) => (
              <div className="col-4 mb-3" key={index}>
                <ProductCard product={result} pathCurrent={props.match.path} />
              </div>
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
