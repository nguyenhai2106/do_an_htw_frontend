import React, { useState, useEffect, Fragment } from "react";
import Form from "react-bootstrap/Form";
import { prices } from "./fixedPrices";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (price) => () => {
    handleFilters(price.array);
    setValue(price);
  };

  return prices.map((price, index) => {
    return (
      <div key={index}>
        <Form.Check
          onChange={handleChange(price)}
          value={`${price._id}`}
          type="radio"
          id={`${price._id}`}
          label={`${price.name}`}
          name={price}
        />
      </div>
    );
  });
};

export default RadioBox;
