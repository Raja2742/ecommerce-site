import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {getProductById,updateProduct} from "../api/productService";

import "../styles/EditProduct.css";
function EditProduct() {

    const [product, setProduct] = useState({
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            imageUrl: ""
        });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [fetching, setFetching] = useState(true);


    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        fetchProduct();

    }, [id]);

    

    const handleChange = (e) => {

    setProduct({

        ...product,

        [e.target.name]: e.target.value

    });

};
    

    

    const fetchProduct = async () => {

    try {

        const response = await getProductById(id);

        setProduct(response.data);

    } finally {

        setFetching(false);

    }

};

    const validateForm = () => {

    let newErrors = {};

    if(product.name.trim() === ""){
        newErrors.name = "Product name is required";
    }

    if(product.description.trim() === ""){
        newErrors.description = "Description is required";
    }

    if(product.price <= 0){
        newErrors.price = "Price must be greater than 0";
    }

    if(product.stock < 0){
        newErrors.stock = "Stock cannot be negative";
    }

    if(product.category.trim() === ""){
        newErrors.category = "Category is required";
    }

    if(product.imageUrl.trim() === ""){
        newErrors.imageUrl = "Image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
        return;
    }


    try {

        setLoading(true);

         await updateProduct(id, product);

        alert("Product Updated Successfully");

        navigate("/products");


    } catch (error) {

        console.error(error.response?.data || error.message);

        alert("Failed to update Product");

    } finally {

        setLoading(false);

        

    }
};

    if(fetching){

        return <h2>Loading...</h2>;

    }
    return (

        
    <div className="update-product-page">

        

        <div className="update-product-card">

            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    type="text"
                    placeholder="name"
                    value={product.name}
                    onChange={handleChange}
                />

                {errors.name && (
                    <p className="error-message">
                        {errors.name}
                    </p>
                )}

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                {errors.description && (
                    <p className="error-message">
                        {errors.description}
                    </p>
                )}

                
                <div className="row">
                <div className="column">
                    <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />

                {errors.price && (
                    <p className="error-message">
                        {errors.price}
                    </p>
                )}
                </div>

                <div className="column">
                    <input
                    name="stock"
                    type="number"
                    placeholder="stock"
                    value={product.stock}
                    onChange={handleChange}
                />

                {errors.stock && (
                    <p className="error-message">
                        {errors.stock}
                    </p>
                )}
                </div>

                </div>

                <input
                    name="category"
                    type="text"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />

                {errors.category && (
                    <p className="error-message">
                        {errors.category}
                    </p>
                )}

                <input
                    name="imageUrl"
                    type="text"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />
                
                {errors.imageUrl && (
                    <p className="error-message">
                        {errors.imageUrl}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Updating Product..." : "Update Product"}
                </button>
            </form>

        </div>

    </div>
);
}

export default EditProduct;