import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Checkout = ({products}) =>{
    const getTotal =()=>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    return  <div>
        <h2>
            Total: ${getTotal()}
        </h2>
        {isAuthenticated() ? 
        (<Button variant="outline-success" style={{borderRadius: "0px"}}>Checkout</Button>) :
        (<Link to="/signin">
             <Button variant="outline-primary" style={{borderRadius: "0px"}}>Sign in to checkout</Button>
        </Link>)}
    </div>

}
export default Checkout;
