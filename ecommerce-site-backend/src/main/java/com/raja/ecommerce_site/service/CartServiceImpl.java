package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.AddToCartRequest;
import com.raja.ecommerce_site.dto.CartResponse;
import com.raja.ecommerce_site.dto.UpdateCartRequest;
import com.raja.ecommerce_site.entity.CartItem;
import com.raja.ecommerce_site.entity.Product;
import com.raja.ecommerce_site.entity.User;
import com.raja.ecommerce_site.exception.CartItemNotFoundException;
import com.raja.ecommerce_site.exception.ProductNotFoundException;
import com.raja.ecommerce_site.exception.InsufficientStockException;
import com.raja.ecommerce_site.exception.UsernameNotFoundException;
import com.raja.ecommerce_site.repository.CartRepository;
import com.raja.ecommerce_site.repository.ProductRepository;
import com.raja.ecommerce_site.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

   public User findUser(){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();


       return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

    }

    private CartResponse mapToResponse(CartItem cartItem) {

        CartResponse response = new CartResponse();

        response.setId(cartItem.getId());

        response.setProductId(cartItem.getProduct().getId());

        response.setProductName(cartItem.getProduct().getName());

        response.setPrice(cartItem.getProduct().getPrice());

        response.setImageUrl(cartItem.getProduct().getImageUrl());

        response.setQuantity(cartItem.getQuantity());

        return response;
    }

    @Override
    public void addToCart(AddToCartRequest request){



        User user = findUser();
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));

        Optional<CartItem> optionalCart =
                cartRepository.findByUserAndProduct(user, product);

        CartItem cartItem;

        if (optionalCart.isPresent()) {

            cartItem = optionalCart.get();

            int quantity=cartItem.getQuantity()+ request.getQuantity();
            if(quantity> product.getStock()){
                throw new InsufficientStockException("quantity cross the stock limit");
            }
            cartItem.setQuantity( quantity);



        } else {

            cartItem = new CartItem();

            cartItem.setUser(user);

            cartItem.setProduct(product);


            if(request.getQuantity()> product.getStock()){
                throw new InsufficientStockException("Only " + product.getStock() + " items are available in stock.");
            }

            cartItem.setQuantity(request.getQuantity());



        }

        cartRepository.save(cartItem);

    }

    @Override
    public List<CartResponse> getCart(){

        User user =findUser();
        List<CartItem> cartItems = cartRepository.findByUser(user);

        return cartItems.stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public void updateQuantity(Long cartItemId, UpdateCartRequest request) {

        // Get logged-in user


        User user = findUser();

        // Find cart item
        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new CartItemNotFoundException("Cart item not found"));

        // Verify cart belongs to logged-in user
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to update this cart item");
        }

        // Check stock
        Product product = cartItem.getProduct();

        if (request.getQuantity() > product.getStock()) {
            throw new InsufficientStockException(
                    "Only " + product.getStock() + " items are available."
            );
        }

        // Update quantity
        cartItem.setQuantity(request.getQuantity());

        // Save
        cartRepository.save(cartItem);
    }


    @Override
    public void removeFromCart(Long cartItemId) {

        User user = findUser();

        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new CartItemNotFoundException("Cart item not found"));

        // Security Check
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You are not allowed to delete this cart item"
            );
        }

        cartRepository.delete(cartItem);
    }

    @Override
    public void clearCart() {

        User user = findUser();

        cartRepository.deleteByUser(user);
    }
}
