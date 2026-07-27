import "../styles/ProductCard.css"
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/productService";
import { useNavigate } from "react-router-dom";






function ProductCard({ product ,onDelete }) {

    const navigate=useNavigate();

    const role = localStorage.getItem("role");
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

                <button
                   className="cart-btn" disabled={product.stock === 0}
                >
                    {product.stock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>
                
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