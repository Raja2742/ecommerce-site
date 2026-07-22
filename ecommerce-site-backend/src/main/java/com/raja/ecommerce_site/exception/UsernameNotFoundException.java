package com.raja.ecommerce_site.exception;

public class UsernameNotFoundException extends RuntimeException{
    public UsernameNotFoundException(String message){
        super(message);
    }
}
