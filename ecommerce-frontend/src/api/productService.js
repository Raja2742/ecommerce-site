import api from "./api";

export const getAllProducts=()=>{
    return api.get("/products");
}

export const addProduct = (productData) => {
    return api.post("/products", productData);
};