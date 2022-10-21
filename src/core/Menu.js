import React, { Fragment } from "react";
import { FaOpencart } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";

import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth/index";

import { itemToTal } from "./cartHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div className="d-flex bg-primary justify-content-between">
    <ul className="nav">
      <li className="nav-item d-flex align-items-center pe-2">
        <div>
          <Link
            className="nav-link"
            style={{
              color: "#ffffff",
              paddingRight: "8px",
              height: "100%",
              lineHeight: "100%",
              paddingLeft: "25px",
            }}
            to={"/"}
          >
            <GiSpellBook
              style={{ width: "40px", height: "40px", marginBottom: "3px" }}
            />
          </Link>
        </div>
        <h3
          style={{
            color: "#ffffff",
            marginBottom: "0px",
            fontFamily: "serif",
            paddingTop: "2px",
          }}
        >
          BOOK STORE
        </h3>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to={"/"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to={"/shop"}
        >
          Shop
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to={"/user/dashboard"}
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to={"/admin/dashboard"}
          >
            Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item d-flex align-items-center">
          <span
            className="nav-link"
            style={{
              cursor: "pointer",
              color: "#ffffff",
              lineHeight: "100%",
              display: "block",
            }}
            onClick={() =>
              signout(() => {
                toast.info("Sign Out!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                history.push("/");
              })
            }
          >
            Sign Out
          </span>
        </li>
      )}
    </ul>
    <ul className="nav" style={{ marginRight: "10px" }}>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to={"/cart"}
        >
          {" "}
          <FaOpencart
            style={
              itemToTal() > 0
                ? { color: "red", width: "30px", height: "30px" }
                : { color: "white", width: "30px", height: "30px" }
            }
          />
          <sup>
            <small
              className="cart-badge"
              style={
                itemToTal() > 0
                  ? { color: "red", width: "30px", height: "30px" }
                  : { color: "white", width: "30px", height: "30px" }
              }
            >
              {itemToTal()}
            </small>
          </sup>
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
