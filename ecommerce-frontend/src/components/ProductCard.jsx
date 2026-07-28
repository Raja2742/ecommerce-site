import "../styles/ProductCard.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/productService";
import { addToCart } from "../api/cartService";
import { useNavigate } from "react-router-dom";



function ProductCard({ product ,onDelete }) {

    const navigate=useNavigate();


    const [quantity, setQuantity] = useState(1);


    const role = localStorage.getItem("role");

    const increaseQuantity = () => {

        if (quantity < product.stock) {

            setQuantity(quantity + 1);

        }

    };

    const decreaseQuantity = () => {

        if (quantity > 1) {

            setQuantity(quantity - 1);

        }

    };

    const handleAddToCart = async () => {

        try {

            await addToCart(product.id, quantity);

            alert("Product Added Successfully");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="product-card">

            <img
                src={product.imageUrl}
                alt={product.name}
            />

            <div className="product-info">

                <h2>{product.name}</h2>

                <p className="category">

                    {product.category}

                </p>

                <p className="description">

                    {product.description}

                </p>

                <h3>

                    ₹{product.price}

                </h3>

                <p className="stock">
                    Stock: {product.stock}
                </p>

                <span className="stock">

                    {product.stock > 0 ? (
                        <p className="in-stock">🟢 In Stock</p>
                    ) : (
                        <p className="out-stock">🔴 Out of Stock</p>
                    )}
                </span>

                <div className="addcart">

                    <button
                    className="cart-btn" disabled={product.stock === 0} onClick={handleAddToCart}
                    >
                        {product.stock === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                    </button>

                    <div className="quantity-container">

                        <button
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button
                            onClick={increaseQuantity}
                        >
                            +
                        </button>

                    </div>
                </div>

                
                
                {role === "ADMIN" && (

                <div className="admin-buttons">

                    <button
                        className="edit-btn"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                        Edit
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(product.id)}>
                        Delete
                    </button>

                </div>

                )}
            </div>

        </div>

    );

}

export default ProductCard;