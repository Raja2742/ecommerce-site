import api from "./api";

export const getCart = () => {
    return api.get("/cart");
};

export const addToCart = (productId, quantity) => {
    return api.post("/cart", {
        productId,
        quantity
    });
};

export const updateCart = (cartItemId, quantity) => {
    return api.put(`/cart/${cartItemId}`, {
        quantity
    });
};

export const removeCartItem = (cartItemId) => {
    return api.delete(`/cart/${cartItemId}`);
};

export const clearCart = () => {
    return api.delete("/cart");
};