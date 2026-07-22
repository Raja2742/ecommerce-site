import { useState,useEffect } from "react";

import { getAllProducts } from "../api/productService";

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
            <div>

            </div>
        );
}

export default Products;

    