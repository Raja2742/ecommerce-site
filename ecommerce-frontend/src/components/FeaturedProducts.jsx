import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import { getAllProducts } from "../api/productService";

import "../styles/FeaturedProducts.css";

function FeaturedProducts() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const response = await getAllProducts();

            setProducts(response.data.slice(0, 4));

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <section className="featured-products">

            <div className="section-header">

                <h2>Featured Products</h2>

                <button
                    onClick={() => navigate("/products")}
                >

                    View All

                </button>

            </div>

            <div className="featured-grid">

                {

                    products.map(product => (

                        <ProductCard

                            key={product.id}

                            product={product}

                        />

                    ))

                }

            </div>

        </section>

    );

}

export default FeaturedProducts;