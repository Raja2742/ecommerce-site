package com.raja.ecommerce_site.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobelExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public String handleEmailAlreadyExistException(EmailAlreadyExistsException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public String handleInvalidCredentialsException(InvalidCredentialsException ex){

        return ex.getMessage();
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public String handleUsernameNotFoundException(UsernameNotFoundException ex){

        return ex.getMessage();
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public String handleProductNotFoundException(ProductNotFoundException ex){

        return ex.getMessage();
    }

    @ExceptionHandler(InsufficientStockException.class)
    public String handleInsufficientStockException(InsufficientStockException ex){

        return ex.getMessage();
    }

    @ExceptionHandler(CartItemNotFoundException.class)
    public String handleCartItemNotFoundException(CartItemNotFoundException ex){

        return ex.getMessage();
    }
}

