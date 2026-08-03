import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts,deleteProduct } from "../api/productService";

import ProductCard from "../components/ProductCard"; 
import "../styles/Products.css"


function Products() {
    const [products,setProducts] =useState([]);
    const [quantity, setQuantity] = useState(1);
    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");

    useEffect(() => {

    fetchProducts();

}, [category]);


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

                let response;

                if (category) {

                    response =
                        await getProductsByCategory(category);

                } else {

                    response =
                        await getAllProducts();

                }

                setProducts(response.data);

            } catch (error) {

                console.log(error);

            }

        };

    

    console.log(products);

    return(
        <div className="products-page">

            <div className="products-header">

                <h2>

                    {

                        category

                        ?

                        `${category} Products`

                        :

                        "All Products"

                    }

                </h2>

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

    