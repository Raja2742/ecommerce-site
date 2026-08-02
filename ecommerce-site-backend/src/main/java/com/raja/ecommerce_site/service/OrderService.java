package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.OrderResponse;

import java.util.List;

public interface OrderService {
    void placeOrder();

    List<OrderResponse> getMyOrders();
}
