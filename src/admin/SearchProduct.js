import React, { useState, useEffect } from "react";
import { getCategories, searchProducts } from "../core/apiCore";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { deleteProduct } from "./apiAdmin";

require("dotenv").config();

const SearchProduct = () => {
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
      return <h4 class="text-center">Found {results.length} product!</h4>;
    }
    if (searched && results.length < 1) {
      return <h4 class="text-center">No products found!</h4>;
    }
  };
  const { user, token } = isAuthenticated();
  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        searchedProducts(results);
      }
    });
  };

  const renderSearch = (searched, results) => {
    if (searched) {
      return (
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="col-9">
                    <strong>{result.name}</strong>
                  </div>
                  <div className="col-3 d-flex justify-content-end">
                    <Link
                      to={`/admin/update/product/${result._id}`}
                      className="mx-2"
                    >
                      <Button variant="outline-primary" type="submit">
                        Update
                      </Button>
                    </Link>
                    <Button
                      onClick={() => destroy(result._id)}
                      variant="danger"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
        <div className="col-12 mx-auto my-2">
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
    <div className="mb-2">
      {searchForm()}
      <div>{searchedProducts(results)}</div>
    </div>
  );
};

export default SearchProduct;
