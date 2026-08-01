package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.entity.*;
import com.raja.ecommerce_site.exception.UsernameNotFoundException;
import com.raja.ecommerce_site.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public void placeOrder() {

        // Get Logged-in User
        User user = getCurrentUser();

        // Get Cart Items
        List<CartItem> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Create Order
        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");
        order.setTotal(0);

        // Save first to generate Order ID
        orderRepository.save(order);

        double total = 0;

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            // Stock Validation
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        product.getName() + " is out of stock");
            }

            // Reduce Stock
            product.setStock(
                    product.getStock() - cartItem.getQuantity());

            productRepository.save(product);

            // Create Order Item
            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice()*cartItem.getQuantity());

            orderItems.add(orderItem);

            // Calculate Total
            total += product.getPrice() * cartItem.getQuantity();
        }

        // Save Order Items
        orderItemRepository.saveAll(orderItems);

        // Update Total
        order.setTotal(total);

        orderRepository.save(order);

        // Clear Cart
        cartRepository.deleteByUser(user);

    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));
    }

}