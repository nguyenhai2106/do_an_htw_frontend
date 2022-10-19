import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Figure from "react-bootstrap/Figure";
import { API } from "../config";
import { updateItem, removeItem } from "./cartHelper";
import { createReview, updateReview, deleteReview } from "../core/apiCore";
import Button from "react-bootstrap/Button";
import { isAuthenticated } from "../auth/index";
import Card from "react-bootstrap/Card";

const Review = ({ review, reviewUpdate, loadListViewRelated = (f) => f }) => {
  // Review
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, token } = isAuthenticated();
  const [newReview, setNewReview] = useState("");

  const destroy = (reviewId) => {
    deleteReview(reviewId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadListViewRelated(review.product);
      }
    });
  };
  const test = () => {
    console.log(review._id);
  };

  return (
    <Card className="mb-2" style={{ border: "none" }}>
      <div className="row">
        <div className="col-1 d-flex justify-content-center align-items-center">
          <Figure className="d-flex justify-content-center mb-0">
            <Figure.Image
              alt="product image"
              src="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"
              style={{
                maxHeight: "100px",
                maxWidth: "100%",
              }}
            />
          </Figure>
        </div>
        <div className="col-11">
          <Form.Label>
            <strong>{review.user.name}</strong>
          </Form.Label>
          <Form.Control
            disabled={isDisabled}
            as="textarea"
            rows={3}
            placeholder="Enter description"
            // onChange={handleChange("description")}
            defaultValue={review.description}
            style={{ background: "white" }}
          />
          {user._id === review.user._id && (
            <div className="d-flex">
              <span className="btn me-2 text-primary p-0">Edit</span>
              <span
                onClick={() => destroy(review._id)}
                className="btn text-danger p-0"
              >
                Delete
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Review;
