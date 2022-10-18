import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { emptyCart } from './CartHelpers';
import { getBraintreeClientToken, processPayment, createOrder } from "./apiCore";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setPaid, paid }) => {
    const [data, setData] = useState({
        loading: false,
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
                setData({ clientToken: res.clientToken });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])
    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    }
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    let deliveryAddress = data.address;
    const buy = () => {
        setData({ loading: true });
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
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                    .then(res => {
                        // console.log(res);
                        setData({ ...data, success: res.success });
                        // create order
                        const createOrderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: deliveryAddress

                        }
                        createOrder(userId, token, createOrderData)
                            .then(res => {
                                // empty cart
                                emptyCart(() => {
                                    console.log('payment success and empty cart');
                                    setData({ loading: false, success: true });
                                    setPaid(!paid);
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        setData({ loading: false, success: false });
                    })
            })
            .catch(error => {
                console.log('dropin error: ', error);
                setData({ ...data, error: error.message });
            })
    }
    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: "vault"
                        }
                    }} onInstance={instance => (data.instance = instance)} />
                    <Button onClick={buy} variant="outline-success" style={{ borderRadius: "0px", width: "100%" }}>Pay</Button>
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
    const showLoading = loading => loading && <h2>Loading...</h2>;
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
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )

}
export default Checkout;
