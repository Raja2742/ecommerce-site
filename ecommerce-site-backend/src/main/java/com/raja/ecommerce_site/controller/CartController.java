package com.raja.ecommerce_site.controller;

import com.raja.ecommerce_site.dto.AddToCartRequest;
import com.raja.ecommerce_site.dto.CartResponse;
import com.raja.ecommerce_site.dto.UpdateCartRequest;
import com.raja.ecommerce_site.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<String> addToCart(
            @RequestBody @Valid AddToCartRequest request) {

        cartService.addToCart(request);

        return ResponseEntity.ok("Product added to cart");
    }

    @GetMapping
    public ResponseEntity<List<CartResponse>> getCart() {

        return ResponseEntity.ok(cartService.getCart());
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<String> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody @Valid UpdateCartRequest request) {

        cartService.updateQuantity(cartItemId, request);

        return ResponseEntity.ok("Quantity updated");
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable Long cartItemId) {

        cartService.removeFromCart(cartItemId);

        return ResponseEntity.ok("Item removed");
    }

    @DeleteMapping
    public ResponseEntity<String> clearCart() {

        cartService.clearCart();

        return ResponseEntity.ok("Cart cleared");
    }
}
