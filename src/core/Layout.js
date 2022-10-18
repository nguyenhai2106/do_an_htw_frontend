import React from "react";
import Menu from "./Menu";
import "../styles.css";

require("dotenv").config();

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron mt-2 mb-2">
      <h3>{title}</h3>
      <p className="lead"> {description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
