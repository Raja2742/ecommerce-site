import { useState,useEffect } from "react";

import { getAllProducts,deleteProduct } from "../api/productService";

import ProductCard from "../components/ProductCard"; 
import "../styles/Products.css"


function Products() {
    const [products,setProducts] =useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(()=>{
        fetchProducts();
    },[]);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProduct(id);

            setProducts(products.filter(
                product => product.id !== id
            ));

            alert("Deleted Successfully");

        } catch (error) {

            console.error(error);
            

        }

    };

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
                        onDelete={handleDelete}
                    />

                ))}

            </div>

        </div>

        );
}

export default Products;

    