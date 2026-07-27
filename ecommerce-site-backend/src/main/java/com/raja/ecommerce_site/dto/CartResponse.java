package com.raja.ecommerce_site.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartResponse {

    private Long id;

    private Long productId;
    private String productName;
    private Double price;
    private String imageUrl;

    private Integer quantity;

}