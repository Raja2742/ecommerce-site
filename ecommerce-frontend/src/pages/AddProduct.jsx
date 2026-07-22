import { useState } from "react";
import { addProduct } from "../api/productService";
import "../styles/AddProduct.css";

function AddProduct() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e) => {

    e.preventDefault();

    const productData = {
        name,
        description,
        price,
        stock,
        category,
        imageUrl
    };

    try {

        const response = await addProduct(productData);

        console.log(response.data);

        alert("Product Added Successfully");

    } catch (error) {

        console.log(error);

        alert("Failed to Add Product");

    }

};

    return (
    <div className="add-product-page">

        <div className="add-product-card">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="row">
                    <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                </div>

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit">
                    Add Product
                </button>

            </form>

        </div>

    </div>
);
}

export default AddProduct;