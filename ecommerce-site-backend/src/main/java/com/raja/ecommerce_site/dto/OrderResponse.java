package com.raja.ecommerce_site.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long orderId;

    private double total;

    private String status;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;

}
