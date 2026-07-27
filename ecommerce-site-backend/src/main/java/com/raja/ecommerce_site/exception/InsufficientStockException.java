package com.raja.ecommerce_site.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String messsage){
        super(messsage);
    }
}
