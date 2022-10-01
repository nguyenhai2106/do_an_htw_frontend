import React, { useState, useEffect, Fragment } from "react";
import Form from "react-bootstrap/Form";
import { prices } from "./fixedPrices";

const RadioBox = ({ prices }) => {
  const [value, setValue] = useState(0);

  const handleChange = (prices) => () => {};

  return prices.map((price, index) => {
    return (
      <div key={index}>
        <Form.Check
          onChange={handleChange}
          value={`${price._id}`}
          type="radio"
          id={`${price._id}`}
          label={`${price.name}`}
        />
      </div>
    );
  });
};

export default RadioBox;
