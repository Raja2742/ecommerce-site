import { useEffect, useState } from "react";
import { getCart } from "../api/cartService";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";

import React from 'react'

function Cart() {


    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {

        try {

            const response = await getCart();

            setCartItems(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };
    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (cartItems.length === 0) {

        return (

            <div className="empty-cart">

                <h2>Your Cart is Empty</h2>

            </div>

        );

    }

    const total = cartItems.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );
    return (

        <div className="cart-page">

            <h1>Shopping Cart</h1>

        <div className="items">
            {

                cartItems.map(item => (

                    <CartItem

                        key={item.id}

                        item={item}

                        fetchCart={fetchCart}
                    />

                ))

            }
        </div>
            

            <div className="cart-total">

                <h2>

                    Total : ${total}

                </h2>

            </div>

        </div>

        );
}

export default Cart