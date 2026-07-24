import { useState } from "react";
import { addProduct } from "../api/productService";
import "../styles/AddProduct.css";

function AddProduct() {

    const initialProduct={

    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: ""

    }

    const [product, setProduct] = useState(initialProduct);

    const handleChange = (e) => {

    const { name, value } = e.target;

    setProduct({
        ...product,
        [name]: value
    });

    };

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const validateForm = () => {

    let newErrors = {};

    if(product.name.trim() === ""){
        newErrors.name = "Product name is required";
    }

    if(product.description.trim() === ""){
        newErrors.description = "Description is required";
    }

    if(product.price === ""){
        newErrors.price = "Price is required";
    }

    if(product.stock === ""){
        newErrors.stock = "Stock is required";
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

    // const productData = {
    //     product.name,
    //     product.description,
    //     price,
    //     stock,
    //     category,
    //     imageUrl
    // };

    try {

        setLoading(true);

        const response = await addProduct(product);

        console.log(response.data);

        alert("Product Added Successfully");
        setProduct(initialProduct);

    } catch (error) {

        console.log(error);

        alert("Failed to Add Product");

    } finally {

        setLoading(false);

        

    }
};
    return (
    <div className="add-product-page">

        <div className="add-product-card">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
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
                    {loading ? "Adding Product..." : "Add Product"}
                </button>
            </form>

        </div>

    </div>
);
}

export default AddProduct;