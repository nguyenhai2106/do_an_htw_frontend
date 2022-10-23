import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Figure from "react-bootstrap/Figure";
import { API } from "../config";
import { updateItem, removeItem } from "./cartHelper";
import { getReview, editReview, deleteReview } from "../core/apiCore";
import Button from "react-bootstrap/Button";
import { isAuthenticated } from "../auth/index";
import Card from "react-bootstrap/Card";
import moment from "moment";

const Review = ({
  index,
  review,
  reviewUpdate,
  destroy = (f) => f,
  loadSingleProduct = (f) => f,
}) => {
  // Review
  const [isDisabled, setIsDisabled] = useState(true);
  const [display, setDisplay] = useState(true);
  const { user, token } = isAuthenticated();

  const styleBtn = {
    display: "none",
  };

  const DisplayBtn = () => {
    setIsDisabled(false);
    setDisplay(false);
  };

  const [textarea, setTextarea] = useState(review.description);

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  const clickSubmit = (event) => {
    const updateReviewData = {
      description: textarea != "" ? textarea : review.description,
    };
    editReview(
      review._id,
      user._id,
      token,
      JSON.stringify(updateReviewData)
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setIsDisabled(true);
        setDisplay(true);
      }
    });
  };

  return (
    <Card className="mb-2 border-0">
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
          <Form.Group>
            <Form.Label>
              <strong>{review.user.name}</strong>
              <p style={{ display: "inline", marginLeft: "10px" }}>
                {moment(review.createdAt).fromNow()}
              </p>
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              as="textarea"
              rows={3}
              value={textarea}
              onChange={handleChange}
            />
          </Form.Group>

          {user && user._id === review.user._id && (
            <div className="d-flex">
              <span
                onClick={() => clickSubmit()}
                className="btn me-2 text-success p-0"
                style={display ? styleBtn : null}
              >
                Confirm Edit
              </span>
              <span
                onClick={() => DisplayBtn()}
                className="btn me-2 text-primary p-0"
              >
                Edit
              </span>
              <span
                onClick={() => destroy(review._id, index)}
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
