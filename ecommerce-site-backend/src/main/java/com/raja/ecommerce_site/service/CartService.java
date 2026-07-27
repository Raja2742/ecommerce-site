package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.AddToCartRequest;
import com.raja.ecommerce_site.dto.CartResponse;
import com.raja.ecommerce_site.dto.UpdateCartRequest;

import java.util.List;

public interface CartService {

    void addToCart(AddToCartRequest request);

    List<CartResponse> getCart();

    void removeFromCart(Long cartItemId);

    void clearCart();



    void updateQuantity(Long cartItemId, UpdateCartRequest request);
}