import api from "./api";

export const getAllProducts=()=>{
    return api.get("/products");
}

export const addProduct = (productData) => {
    return api.post("/products", productData);
};

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

export const updateProduct = (id, product) => {
    return api.put(`/products/${id}`, product);
};

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};