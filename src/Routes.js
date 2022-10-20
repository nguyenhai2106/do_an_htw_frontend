import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Order";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import { ToastContainer } from 'react-toastify';

import Shop from "./core/Shop";
import Cart from "./core/Cart";

import Product from "./core/Product";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        ></AdminRoute>
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute
          path="/admin/update/product/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
      <ToastContainer/>
    </BrowserRouter>
  );
};

export default Routes;
