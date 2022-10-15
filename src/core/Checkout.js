import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getBraintreeClientToken, processPayment } from "./apiCore";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const getToken = async (userId, token) => {
        try {
            const res = await getBraintreeClientToken(userId, token);
            if (res.error) {
                console.log(res.error);
                setData({ ...data, error: res.error });
            }
            else {
                console.log(res);
                setData({clientToken: res.clientToken });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    const buy = () => {
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log('send nonce and total process: ', nonce, getTotal(products));
                const paymentData ={
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                .then(res => {
                    // console.log(res);
                    setData({...data, success: res.success});
                    // empty cart
                    // create order
                })
                .catch(err => console.log(err))
            })
            .catch(error => {
                console.log('dropin error: ', error);
                setData({ ...data, error: error.message });
            })
    }
    const showDropIn = () => (
        <div onBlur={()=> setData({...data, error:""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <Button onClick={buy} variant="outline-success" style={{ borderRadius: "0px" , width:"100%"}}>Pay</Button>
                </div>
            ) : null}
        </div>
    )
    const showError = error => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}>
            Thanks! Your payment was successful!
        </div>
    )

    const showCheckout = () => {
        return isAuthenticated() ?
            (<div>{showDropIn()}</div>) :
            (<Link to="/signin">
                <Button variant="outline-primary" style={{ borderRadius: "0px" }}>Sign in to checkout</Button>
            </Link>)
    }
    return (
        <div>
            <h2>
                Total: ${getTotal()}
            </h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )

}
export default Checkout;
