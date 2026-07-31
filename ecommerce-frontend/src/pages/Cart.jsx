import { useEffect, useState } from "react";
import { getCart,removeCartItem,clearCart } from "../api/cartService";
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

    const handleRemove = async (id) => {
    
            const confirmRemove = window.confirm(
                "Are you sure?"
            );
    
            if (!confirmRemove) return;
    
            try {
    
                await removeCartItem(id);
    
                setCartItems(cartItems.filter(
                    cartItem => cartItem.id !== id
                ));
    
                alert("Removed Successfully");
    
            } catch (error) {
    
                console.error(error);
                
    
            }
    
        };

        const handleclearCart = async () => {
    
            const confirmRemove = window.confirm(
                "Are you sure?"
            );
    
            if (!confirmRemove) return;
    
            try {
    
                await clearCart();
    
                
    
                alert("clearCart Successfully");
    
            } catch (error) {
    
                console.error(error);
                
    
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

        <div className="cart-page" >

        <div className="cart-header">
            <h1>Shopping Cart</h1>

            <button onClick={()=>handleclearCart()}>clearCart</button>
        </div>

        <div className="items">
            {

                cartItems.map(item => (

                    <CartItem

                        key={item.id}

                        item={item}

                        fetchCart={fetchCart}

                        handleRemove={handleRemove}
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