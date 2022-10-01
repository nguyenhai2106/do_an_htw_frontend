import React from "react";
import { API } from "../config";
import Figure from "react-bootstrap/Figure";

const ShowImage = ({ item, url }) => {
  return (
    <Figure className="d-flex justify-content-center">
      <Figure.Image
        alt="product image"
        src={`${API}/${url}/photo/${item._id}`}
        style={{ maxHeight: "300px", maxWidth: "100%" }}
      />
    </Figure>
  );
};

export default ShowImage;
