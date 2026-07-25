import { useState,useEffect } from "react";

import { getAllProducts } from "../api/productService";

import ProductCard from "../components/ProductCard"; 
import "../styles/Products.css"
function Products() {
const [products,setProducts] =useState([]);

useEffect(()=>{
    fetchProducts();
},[]);


const fetchProducts = async () => {

    try {

        const response = await getAllProducts();

        setProducts(response.data);

    } catch (error) {

        console.log(error);

    }

};
    console.log(products);

    return(
        <div className="products-page">

            <div className="products-header">

                <h1>Our Products</h1>

                <p>
                    Discover premium products carefully selected for you.
                </p>

            </div>

            <div className="products-grid">

                {products.map(product => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </div>

        );
}

export default Products;

    