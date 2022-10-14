import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./CartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {

    const [items, setItems] = useState([]);
    const [remove, setRemove] = useState(false);
    const [itemCount, setItemCount] = useState(false);
    function onRemoveItem() {
        setRemove(!remove);
    }
    function onChangeItemCount() {
        setItemCount(!itemCount);
    }
    useEffect(() => {
        setItems(getCart());
        return () => {
            setItems([]);
            setItemCount(false);
            setRemove(false);
        }
    }, [remove, itemCount]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                <div className="row">
                {items.map((product, i) => (
                    <Card
                        isCartView={true}
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        onRemove={onRemoveItem}
                        onChangeCount={onChangeItemCount}
                    />
                ))}
                </div>               
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty.<br /> <Link to="/shop">Continue Shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2>Your cart sumary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;