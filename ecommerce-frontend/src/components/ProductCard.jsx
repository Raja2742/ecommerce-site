import "../styles/ProductCard.css"

function ProductCard({ product }) {

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

                <span className="stock">

                    {product.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}

                </span>

                <button>

                    View Details

                </button>

            </div>

        </div>

    );

}

export default ProductCard;