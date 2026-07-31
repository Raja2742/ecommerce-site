import { useState,useEffect } from "react";
import "../styles/CartItem.css";
import { updateCart } from "../api/cartService";
function CartItem({ item ,fetchCart ,handleRemove}) {

    
    
    const [quantity, setQuantity] = useState(item.quantity);
    
    
    const subtotal=item.price * quantity;
                    
    
    const handleUpdateCart = async (newQuantity) => {
                    
             try {
                
                    
                await updateCart(item.id,newQuantity);
                fetchCart();
                    
                } catch (error) {
                    
                console.error(error);
                    
                } 
                    
            };
        const role = localStorage.getItem("role");
    
        const increaseQuantity = () => {
    
            if(quantity < item.stock){

                const newQuantity = quantity + 1;

                setQuantity(newQuantity);

                handleUpdateCart(newQuantity);

            }
    
        };
    
        const decreaseQuantity = () => {
    
            if (quantity > 1) {
    
                const newQuantity = quantity - 1;

                setQuantity(newQuantity);

                handleUpdateCart(newQuantity);
            }
    
        };
    return (

        <div className="cart-item">

            <img
                src={item.imageUrl}
                alt={item.name}
            />

            <div className="cart-details">

                <h3>{item.productName}</h3>

                <p>{item.description}</p>

                <h4>${item.price}</h4>
                
                <p>

                    Subtotal : ${subtotal}

                </p>

            </div>

            <div className="cart-actions">

                <div className="quantity-controls">

                    <button onClick={decreaseQuantity}>-</button>

                    <span >{quantity}</span>

                    <button onClick={increaseQuantity}>+</button>

                </div>

                <button onClick={()=>handleRemove(item.id)} className="remove-btn">

                    Remove

                </button>

            </div>

        </div>

    );

}

export default CartItem;