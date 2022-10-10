import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {getProducts, getBraintreeClientToken} from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

