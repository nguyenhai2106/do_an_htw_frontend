import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (category) => () => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    // console.log(checked.indexOf(category));
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((category, index) => {
    return (
      <li key={index}>
        <Form.Check
          type="checkbox"
          id={`${category._id}`}
          label={`${category.name}`}
          onChange={handleToggle(category._id)}
          value={checked.indexOf(category._id === -1)}
        />
      </li>
    );
  });
};

export default Checkbox;
