
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../api/productService";
import { addToCart } from "../api/cartService";

import "../styles/ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    const [adding, setAdding] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {

        fetchProduct();

    }, [id]);


    const fetchProduct = async () => {

        try {

            setLoading(true);

            const response = await getProductById(id);

            setProduct(response.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load product.");

        } finally {

            setLoading(false);

        }

    };


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

            setAdding(true);

            setMessage("");

            /*
             * Change the property names here if your
             * backend expects a different request body.
             */

            await addToCart(

                product.id,

                quantity

            );

            setMessage("Product added to cart successfully.");

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data || "Failed to add product to cart."
            );

        } finally {

            setAdding(false);

        }

    };


    const handleBuyNow = async () => {

        try {

            setAdding(true);

            await addToCart(

                product.id,

                quantity

            );

            navigate("/cart");

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data || "Failed to add product to cart."
            );

        } finally {

            setAdding(false);

        }

    };


    if (loading) {

        return (

            <div className="product-details-loading">

                Loading product...

            </div>

        );

    }


    if (error || !product) {

        return (

            <div className="product-details-error">

                {error || "Product not found."}

            </div>

        );

    }


    return (

        <div className="product-details-page">

            <div className="product-details-card">

                {/* Product Image */}

                <div className="product-image-section">

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-details-image"
                    />

                </div>


                {/* Product Information */}

                <div className="product-info-section">

                    <span className="product-category">

                        {product.category}

                    </span>

                    <h1>

                        {product.name}

                    </h1>

                    <p className="product-description">

                        {product.description}

                    </p>

                    <h2 className="product-price">

                        ${product.price}

                    </h2>


                    <p className="stock-info">

                        {product.stock > 0
                            ? `${product.stock} items available`
                            : "Out of stock"
                        }

                    </p>


                    {product.stock > 0 && (

                        <>

                            {/* Quantity */}

                            <div className="quantity-section">

                                <span>Quantity</span>

                                <div className="quantity-controls">

                                    <button
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>

                                    <span>

                                        {quantity}

                                    </span>

                                    <button
                                        onClick={increaseQuantity}
                                        disabled={
                                            quantity >= product.stock
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            {/* Buttons */}

                            <div className="product-buttons">

                                <button
                                    className="add-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                >

                                    {adding
                                        ? "Adding..."
                                        : "Add to Cart"
                                    }

                                </button>


                                <button
                                    className="buy-now-btn"
                                    onClick={handleBuyNow}
                                    disabled={adding}
                                >

                                    Buy Now

                                </button>

                            </div>


                            {message && (

                                <p className="cart-message">

                                    {message}

                                </p>

                            )}

                        </>

                    )}

                </div>

            </div>

        </div>

    );

}

export default ProductDetails;

