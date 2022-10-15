import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, searchProducts } from "../core/apiCore";
import ProductCart from "../core/Card";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

require("dotenv").config();

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      searchProducts({ search: search || undefined, category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} product!`;
    }
    if (searched && results.length < 1) {
      return `No products found!`;
    }
  };

  const renderSearch = (searched, results) => {
    if (searched) {
      return (
        <div className="row">
          {results.map((result, index) => (
            <div key={index} className="col-3 mb-3">
              <ProductCart product={result} />
            </div>
          ))}
        </div>
      );
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h3>{searchMessage(searched, results)}</h3>
        {renderSearch(searched, results)}
      </div>
    );
  };
  const searchForm = () => (
    <div className="container">
      <div className="row">
        <div className="col-8 mx-auto my-2">
          <Form onSubmit={searchSubmit}>
            <InputGroup>
              <Form.Select
                aria-label="Default select example"
                style={{ flex: "0.15", borderRight: "0" }}
                onChange={handleChange("category")}
              >
                <option value={"All"}>Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                type="search"
                onChange={handleChange("search")}
                placeholder="Search product..."
              />
              <Button type="submit">Search</Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {searchForm()}
      <div>{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
