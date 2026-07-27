package com.raja.ecommerce_site.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import lombok.Setter;

@Getter
@Setter
public class AddToCartRequest {

    @NotNull
    private Long productId;
    @NotNull
    @Min(value = 1)
    private Integer quantity;

}